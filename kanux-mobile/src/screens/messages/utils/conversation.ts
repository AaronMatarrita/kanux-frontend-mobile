import { Conversation } from "../types/message";
import { ImageSourcePropType } from "react-native";

export const getConversationName = (c: Conversation) => {
  if (c.company) return c.company.name;
  return "Compañía";
};

export const getConversationAvatar = (
  c: Conversation,
): ImageSourcePropType | undefined => {
  if (c.company?.url_logo) {
    return { uri: c.company.url_logo };
  }

  return { uri: "https://picsum.photos/seed/company/300" };
};

export const formatTime = (iso?: string) => {
  if (!iso) return "";

  const timeZone = "America/Costa_Rica";

  const date = new Date(iso);
  const now = new Date();

  const getDateKey = (d: Date) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);

  const dateKey = getDateKey(date);
  const nowKey = getDateKey(now);

  if (dateKey === nowKey) {
    return date.toLocaleTimeString("es-CR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (dateKey === getDateKey(yesterday)) {
    return "Ayer";
  }

  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 7) {
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    return days[
      new Date(
        new Intl.DateTimeFormat("en-US", { timeZone }).format(date),
      ).getDay()
    ];
  }

  return date.toLocaleDateString("es-CR", {
    month: "short",
    day: "numeric",
    timeZone,
  });
};

export const getUnreadCount = (c: Conversation) => {
  if (!c.last_message) return 0;
  const isFromCompany = c.last_message.sender_type === "Companhia";
  return isFromCompany && !c.last_message.is_read ? 1 : 0;
};

export const getMessagePreview = (c: Conversation) => {
  if (!c.last_message) return "Inicia conversación";

  const isFromCompany = c.last_message.sender_type === "Companhia";
  const prefix = isFromCompany ? "" : "Tú: ";

  return prefix + c.last_message.content;
};

export const formatDateLabel = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  if (sameDay(date, today)) return "Hoy";
  if (sameDay(date, yesterday)) return "Ayer";

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
