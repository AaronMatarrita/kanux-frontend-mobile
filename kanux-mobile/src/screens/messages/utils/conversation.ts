import { Conversation } from "../types/message";
import { ImageSourcePropType } from "react-native";

export const getConversationName = (c: Conversation) => {
  if (c.company) return c.company.name;
  if (c.talent)
    return `${c.talent.first_name ?? ""} ${c.talent.last_name ?? ""}`.trim();
  return "Sin nombre";
};

export const getConversationAvatar = (
  c: Conversation
): ImageSourcePropType | undefined => {
  if (c.company?.url_logo) {
    return { uri: c.company.url_logo };
  }

  if (c.talent?.url_logo) {
    return { uri: c.talent.url_logo };
  }

  return { uri: "https://picsum.photos/seed/talent1/300" };
};

export const formatTime = (iso?: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const getUnreadCount = (c: Conversation) => {
  if (!c.last_message) return 0;
  return c.last_message.is_read ? 0 : 1;
};
