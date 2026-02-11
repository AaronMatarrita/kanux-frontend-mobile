import { io, Socket } from "socket.io-client";

export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  DISCONNECTING: "disconnecting",
  JOIN_CONVERSATION: "join_conversation",
  LEAVE_CONVERSATION: "leave_conversation",
  SEND_MESSAGE: "send_message",
  MESSAGE_RECEIVED: "message_received",
  MESSAGE_ERROR: "message_error",
  USER_TYPING: "user_typing",
  USER_STOP_TYPING: "user_stop_typing",
  USER_IS_TYPING: "user_is_typing",
  MESSAGE_READ: "message_read",
  MESSAGES_MARKED_AS_READ: "messages_marked_as_read",
  ERROR: "error",
} as const;

export interface SendMessagePayload {
  conversationId: string;
  text: string;
}

export interface SendMessageResponse {
  success: boolean;
  messageId?: string;
  timestamp?: string;
  status?: string;
  message?: string;
  error?: any;
}

export interface MessageReceivedPayload {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "Companhia" | "Talento";
  content: string;
  createdAt: string;
}

export interface UserTypingPayload {
  conversationId: string;
  userId: string;
}

export interface MessageReadPayload {
  messageId?: string;
  conversationId: string;
}

export interface MessagesMarkedAsReadPayload {
  conversationId: string;
  messageIds: string[];
  markedCount: number;
  readBy: string;
  readAt: string;
}

class SocketService {
  private socket: Socket | null = null;
  private token: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  private debug = false;

  private log(...args: any[]) {
    if (!this.debug) return;
    console.log("[SocketService]", ...args);
  }

  connect(token: string): Socket {
    if (this.socket?.connected) {
      this.log("connect() llamado pero ya estaba connected = true");
      return this.socket;
    }

    this.token = token;

    const rawUrl =
      process.env.EXPO_PUBLIC_MESSAGES_WS_URL ||
      process.env.NEXT_PUBLIC_MESSAGES_WS_URL ||
      "http://localhost:3006/messages";

    const socketUrl =
      rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
        ? rawUrl
        : `http://${rawUrl}`;

    this.log("connect() rawUrl =", rawUrl);
    this.log("connect() socketUrl(normalized) =", socketUrl);

    this.log("connect() socketUrl =", socketUrl);
    this.log("connect() token present =", Boolean(this.token));

    this.socket = io(socketUrl, {
      auth: { token: this.token },
      transports: ["polling"],

      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
      forceNew: true,
      timeout: 10000,
    });

    this.setupConnectionListeners();

    return this.socket;
  }

  private setupConnectionListeners(): void {
    if (!this.socket) return;

    this.socket.onAny((event, ...args) => {
      this.log("onAny IN:", event, args?.[0]);
    });

    const originalEmit = this.socket.emit.bind(this.socket);
    this.socket.emit = ((event: any, ...args: any[]) => {
      this.log("emit OUT:", event, args?.[0]);
      return originalEmit(event, ...args);
    }) as any;

    this.socket.on("connect", () => {
      this.reconnectAttempts = 0;
      this.log("CONNECTED id =", this.socket?.id);
      this.log(
        "CONNECTED transport =",
        this.socket?.io?.engine?.transport?.name,
      );
    });

    this.socket.on("disconnect", (reason) => {
      this.log("DISCONNECTED reason =", reason);
    });

    this.socket.on("connect_error", (error: any) => {
      this.reconnectAttempts++;
      this.log("CONNECT_ERROR attempt =", this.reconnectAttempts, "error =", {
        message: error?.message,
        name: error?.name,
        description: error?.description,
        context: error?.context,
        stack: error?.stack,
      });

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.log("Max reconnect attempts reached. Disconnecting...");
        this.disconnect();
      }
    });

    this.socket.on(SOCKET_EVENTS.ERROR, (err) => {
      this.log("SOCKET_EVENTS.ERROR =", err);
    });

    const engine = this.socket.io?.engine;
    if (engine) {
      engine.on("close", (reason: any) => this.log("ENGINE close =", reason));
      engine.on("packet", (p: any) =>
        this.log("ENGINE packet type =", p?.type),
      );
      engine.on("error", (e: any) => this.log("ENGINE error =", e));
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.log("disconnect() manual called");
      this.socket.disconnect();
      this.socket = null;
      this.token = null;
      this.reconnectAttempts = 0;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  joinConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      this.log("joinConversation skipped: not connected", { conversationId });
      return;
    }
    this.log("joinConversation()", { conversationId });
    this.socket.emit(SOCKET_EVENTS.JOIN_CONVERSATION, { conversationId });
  }

  leaveConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      this.log("leaveConversation skipped: not connected", { conversationId });
      return;
    }
    this.log("leaveConversation()", { conversationId });
    this.socket.emit(SOCKET_EVENTS.LEAVE_CONVERSATION, { conversationId });
  }

  sendMessage(
    payload: SendMessagePayload,
    callback?: (response: SendMessageResponse) => void,
  ): void {
    if (!this.socket?.connected) {
      this.log("sendMessage failed: socket not connected", payload);
      callback?.({ success: false, message: "Socket not connected" });
      return;
    }

    this.log("sendMessage()", payload);

    this.socket.emit(SOCKET_EVENTS.SEND_MESSAGE, payload, (resp: any) => {
      this.log("sendMessage ACK response =", resp);
      callback?.(resp);
    });
  }

  onMessageReceived(
    callback: (message: MessageReceivedPayload) => void,
  ): () => void {
    if (!this.socket) return () => {};
    this.log("register listener: MESSAGE_RECEIVED");
    this.socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, callback);
    return () => {
      this.log("remove listener: MESSAGE_RECEIVED");
      this.socket?.off(SOCKET_EVENTS.MESSAGE_RECEIVED, callback);
    };
  }

  onMessageError(callback: (error: any) => void): () => void {
    if (!this.socket) return () => {};
    this.log("register listener: MESSAGE_ERROR");
    this.socket.on(SOCKET_EVENTS.MESSAGE_ERROR, callback);
    return () => {
      this.log("remove listener: MESSAGE_ERROR");
      this.socket?.off(SOCKET_EVENTS.MESSAGE_ERROR, callback);
    };
  }

  emitUserTyping(conversationId: string, userId: string): void {
    if (!this.socket?.connected) return;
    this.log("emitUserTyping()", { conversationId, userId });
    this.socket.emit(SOCKET_EVENTS.USER_TYPING, { conversationId, userId });
  }

  emitUserStopTyping(conversationId: string, userId: string): void {
    if (!this.socket?.connected) return;
    this.log("emitUserStopTyping()", { conversationId, userId });
    this.socket.emit(SOCKET_EVENTS.USER_STOP_TYPING, {
      conversationId,
      userId,
    });
  }

  onUserTyping(callback: (payload: UserTypingPayload) => void): () => void {
    if (!this.socket) return () => {};
    this.log("register listener: USER_IS_TYPING");
    this.socket.on(SOCKET_EVENTS.USER_IS_TYPING, callback);
    return () => {
      this.log("remove listener: USER_IS_TYPING");
      this.socket?.off(SOCKET_EVENTS.USER_IS_TYPING, callback);
    };
  }

  onUserStopTyping(callback: (payload: UserTypingPayload) => void): () => void {
    if (!this.socket) return () => {};
    this.log("register listener: USER_STOP_TYPING");
    this.socket.on(SOCKET_EVENTS.USER_STOP_TYPING, callback);
    return () => {
      this.log("remove listener: USER_STOP_TYPING");
      this.socket?.off(SOCKET_EVENTS.USER_STOP_TYPING, callback);
    };
  }

  markMessageAsRead(payload: MessageReadPayload): void {
    if (!this.socket?.connected) return;
    this.log("markMessageAsRead()", payload);
    this.socket.emit(SOCKET_EVENTS.MESSAGE_READ, payload);
  }

  onMessagesMarkedAsRead(
    callback: (payload: MessagesMarkedAsReadPayload) => void,
  ): () => void {
    if (!this.socket) return () => {};
    this.log("register listener: MESSAGES_MARKED_AS_READ");
    this.socket.on(SOCKET_EVENTS.MESSAGES_MARKED_AS_READ, callback);
    return () => {
      this.log("remove listener: MESSAGES_MARKED_AS_READ");
      this.socket?.off(SOCKET_EVENTS.MESSAGES_MARKED_AS_READ, callback);
    };
  }
}

export const socketService = new SocketService();
