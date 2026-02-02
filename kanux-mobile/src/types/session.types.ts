export type TalentProfile = {
  id: string;
  id_user: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  bio: string | null;
  location: string | null;
  skills: string[] | null;
  photo_url: string | null;
  created_at: string;
};

type TalentSession = {
  userType: "talent";
  profile: TalentProfile;
};

export type Session = {
  isAuthenticated: boolean;
  token: string;
  sessionId: string;
  user: {
    id: string;
    email: string;
  } & TalentSession;
};

export type BackendLoginResponse = {
  token: string;
  sessionId: string;
  user: {
    id: string;
    email: string;
    userType: "talent";
    profile: TalentProfile;
  };
};
