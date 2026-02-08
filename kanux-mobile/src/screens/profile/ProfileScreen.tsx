import { ScrollView } from "react-native";
import { useState } from "react";
import { spacing } from "@theme";
import Header from "@/components/ui/Header";

import ProfileHeader from "@/screens/profile/components/ProfileHeader";
import { ProfileProgress } from "./components/ProfileProgress";
import { ProfileTabs } from "./components/ProfileTabs";
import { AboutSection } from "./components/sections/AboutSection";
import { BasicInfoSection } from "./components/sections/BasicInfoSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ActivitySection } from "./components/sections/ActivitySection";
import { ProfileData } from "./types";

const ProfileScreen = () => {
  const [tab, setTab] = useState<"resume" | "skills" | "activity">("resume");
  const [profile, setProfile] = useState<ProfileData | null>(null);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
      <Header title={"Mi Perfil"} />
      <ProfileHeader profile={profile!} onEditPress={() => {}} />
      <ProfileProgress />
      <ProfileTabs active={tab} onChange={setTab} />

      {tab === "resume" && (
        <>
          <AboutSection onEditPress={() => {}} />
          <BasicInfoSection onEditPress={() => {}} />
        </>
      )}
      {tab === "skills" && <SkillsSection onEditPress={() => {}} />}
      {tab === "activity" && <ActivitySection />}
    </ScrollView>
  );
};

export default ProfileScreen;
