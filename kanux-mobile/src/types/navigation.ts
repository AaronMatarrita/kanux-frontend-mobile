import { ImageSourcePropType } from "react-native";

export type TabNavigatorParamList = {
  Home: undefined;
  Feed: undefined;
  Challenges: undefined;
  Messages: undefined;
  Profile: undefined;
  Skills:undefined;
  Billing:undefined;
};

export type RootNavigatorParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type MessagesStackParamList = {
  MessagesList: undefined;
  Chat: {
    conversationId: string;
    conversationName: string;
    conversationAvatar?: ImageSourcePropType;
    companyId?: string;
  };
};

export type ChallengesStackParamList = {
  ChallengesList: undefined;
  ChallengeDetail: { challengeId: string };
  ChallengeRun: { challengeId: string };
  ChallengeResult: { challengeId: string; score?: number };
};