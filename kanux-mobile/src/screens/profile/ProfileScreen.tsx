import { ScrollView } from "react-native";
import { useState } from "react";
import { commonStyles } from "@theme";
import Header from "@/components/ui/Header";

import ProfileHeader from "@/screens/profile/components/ProfileHeader";
import { ProfileProgress } from "./components/ProfileProgress";
import { ProfileTabs } from "./components/ProfileTabs";
import { AboutSection } from "./components/sections/AboutSection";
import { BasicInfoSection } from "./components/sections/BasicInfoSection";
import { ProfileData } from "./types";

const ProfileScreen = () => {
  const [tab, setTab] = useState<"resume" | "skills" | "activity">("resume");
  const [profile, setProfile] = useState<ProfileData | null>(null);

  return (
    <ScrollView>
      <Header title={"Mi Perfil"} />
      <ProfileHeader profile={profile!} onEditPress={() => {}} />
      <ProfileProgress />
      <ProfileTabs active={tab} onChange={setTab} />

      {tab === "resume" && (
        <>
          <AboutSection />
          <BasicInfoSection />
        </>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
