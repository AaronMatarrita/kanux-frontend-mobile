import { useEffect, useRef, useCallback, useState } from "react";
import { AppState } from "react-native";
import {
  socketService,
  MessageReceivedPayload,
  SendMessageResponse,
} from "@/services/socket.service";

export type Message = {
  id: string;
  conversation_id: string;
  sender_type: "Companhia" | "Talento";
  content: string;
  created_at: string;
  is_read: boolean;
};

interface UseWebSocketParams {
  token?: string;
  conversationId?: string;
  enabled?: boolean;
  onMessageReceived?: (message: Message) => void;
  onMessageError?: (error: any) => void;
  onTyping?: (userId: string) => void;
  onStopTyping?: (userId: string) => void;
}

interface UseWebSocketReturn {
  sendMessage: (
    content: string,
  ) => Promise<{ success: boolean; messageId?: string }>;
  emitTyping: (userId: string) => void;
  emitStopTyping: (userId: string) => void;
  isConnected: boolean;
}

export function useWebSocket({
  token,
  conversationId,
  onMessageReceived,
  onMessageError,
  onTyping,
  onStopTyping,
  enabled = true,
}: UseWebSocketParams): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);

  const hasJoinedRef = useRef(false);
  const currentConversationRef = useRef<string | null>(null);

  const onMessageReceivedRef = useRef(onMessageReceived);
  const onMessageErrorRef = useRef(onMessageError);
  const onTypingRef = useRef(onTyping);
  const onStopTypingRef = useRef(onStopTyping);

  useEffect(() => {
    onMessageReceivedRef.current = onMessageReceived;
  }, [onMessageReceived]);
  useEffect(() => {
    onMessageErrorRef.current = onMessageError;
  }, [onMessageError]);
  useEffect(() => {
    onTypingRef.current = onTyping;
  }, [onTyping]);
  useEffect(() => {
    onStopTypingRef.current = onStopTyping;
  }, [onStopTyping]);

  useEffect(() => {
    if (!enabled) return;

    if (!token) {
      setIsConnected(false);
      return;
    }

    socketService.connect(token);

    const socket = socketService.getSocket();
    if (!socket) {
      setIsConnected(false);
      return;
    }

    const handleConnect = () => {
      setIsConnected(true);

      hasJoinedRef.current = false;

      if (currentConversationRef.current) {
        socketService.joinConversation(currentConversationRef.current);
        hasJoinedRef.current = true;
      }
    };

    const handleDisconnect = (reason: any) => {
      setIsConnected(false);
      hasJoinedRef.current = false;
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    setIsConnected(socket.connected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [enabled, token]);

  useEffect(() => {
    if (!enabled || !token) return;

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        socketService.connect(token);
      }
    });

    return () => sub.remove();
  }, [enabled, token]);

  useEffect(() => {
    if (!enabled || !isConnected) return;

    const cleanup = socketService.onMessageReceived(
      (payload: MessageReceivedPayload) => {
        const message: Message = {
          id: payload.id,
          conversation_id: payload.conversationId,
          sender_type: payload.senderType,
          content: payload.content,
          created_at: payload.createdAt,
          is_read: false,
        };

        onMessageReceivedRef.current?.(message);
      },
    );

    return cleanup;
  }, [enabled, isConnected]);

  useEffect(() => {
    if (!enabled || !isConnected) return;

    const cleanup = socketService.onMessageError((err) => {
      onMessageErrorRef.current?.(err);
    });

    return cleanup;
  }, [enabled, isConnected]);

  useEffect(() => {
    if (!enabled || !conversationId || !isConnected) {
      return;
    }

    if (
      currentConversationRef.current &&
      currentConversationRef.current !== conversationId
    ) {
      socketService.leaveConversation(currentConversationRef.current);
      hasJoinedRef.current = false;
    }

    if (!hasJoinedRef.current) {
      socketService.joinConversation(conversationId);
      currentConversationRef.current = conversationId;
      hasJoinedRef.current = true;
    }

    return () => {
      if (currentConversationRef.current) {
        socketService.leaveConversation(currentConversationRef.current);
      }
      hasJoinedRef.current = false;
      currentConversationRef.current = null;
    };
  }, [enabled, conversationId, isConnected]);

  const sendMessage = useCallback(
    async (content: string) => {
      return new Promise<{ success: boolean; messageId?: string }>(
        (resolve, reject) => {
          if (!conversationId)
            return reject(new Error("No conversation selected"));
          if (!socketService.isConnected())
            return reject(new Error("Socket not connected"));

          socketService.sendMessage(
            { conversationId, text: content },
            (response: SendMessageResponse) => {
              if (response.success)
                resolve({ success: true, messageId: response.messageId });
              else
                reject(new Error(response.message || "Failed to send message"));
            },
          );
        },
      );
    },
    [conversationId],
  );

  const emitTyping = useCallback(
    (userId: string) => {
      if (!conversationId || !socketService.isConnected()) return;
      socketService.emitUserTyping(conversationId, userId);
    },
    [conversationId],
  );

  const emitStopTyping = useCallback(
    (userId: string) => {
      if (!conversationId || !socketService.isConnected()) return;
      socketService.emitUserStopTyping(conversationId, userId);
    },
    [conversationId],
  );

  return { sendMessage, emitTyping, emitStopTyping, isConnected };
}
