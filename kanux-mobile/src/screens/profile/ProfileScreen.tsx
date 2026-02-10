import { ScrollView } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "@navigation";
import Header from "@/components/ui/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { spacing } from "@/theme";
import { useModalState } from "./hooks/useModalState";
import { ProfileEditModals } from "@/screens/profile/modals/ProfileEditModals";

import ProfileHeader from "@/screens/profile/components/ProfileHeader";
import { ProfileSkeleton } from "@/screens/profile/components/ProfileSkeleton";
import { ProfileTabs } from "@/screens/profile/components/ProfileTabs";
import { AboutSection } from "@/screens/profile/components/sections/AboutSection";
import { BasicInfoSection } from "@/screens/profile/components/sections/BasicInfoSection";
import { SkillsSection } from "@/screens/profile/components/sections/SkillsSection";
import { ActivitySection } from "@/screens/profile/components/sections/ActivitySection";
import { SettingsSection } from "@/screens/profile/components/sections/SettingsSection";

import { useTalentProfile } from "./hooks/useTalentProfile";
import { useProfileEdits } from "./hooks/useProfileEdits";

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, "ProfileMain">;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [tab, setTab] = useState<"resume" | "skills" | "activity">("resume");
  const {
    profile,
    setProfile,
    catalogs,
    languageCatalog,
    loading,
    error,
    reload,
  } = useTalentProfile();
  const {
    isSavingAbout,
    saveAbout,
    isSavingBasicInfo,
    saveBasicInfo,
    isSavingHeader,
    saveHeader,
    isSavingSkills,
    saveSkills,
  } = useProfileEdits(profile, catalogs, setProfile);

  const modal = useModalState();

  if (loading) {
    return (
      <ScrollView
        style={scrollStyle}
        contentContainerStyle={{ paddingBottom: spacing.xxxl }}
      >
        <Header title={"Mi Perfil"} />
        <ProfileSkeleton />
      </ScrollView>
    );
  }

  if (!profile || error) {
    return (
      <ScrollView style={scrollStyle} contentContainerStyle={{ flexGrow: 1 }}>
        <Header title={"Mi Perfil"} />
        <EmptyState
          title="No se pudo cargar el perfil"
          description="Revisa tu conexión e intenta de nuevo."
          buttonTitle="Reintentar"
          onButtonPress={reload}
        />
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView
        style={scrollStyle}
        contentContainerStyle={{ paddingBottom: spacing.xxxl }}
      >
        <Header title={"Mi Perfil"} />

        <ProfileHeader
          profile={profile}
          onEditPress={() => modal.open("edit_header")}
        />

        <ProfileTabs active={tab} onChange={setTab} />

        {tab === "resume" && (
          <>
            <AboutSection
              about={profile.about}
              onEditPress={() => modal.open("edit_about")}
            />
            <BasicInfoSection
              experienceLevel={profile.basicInfo.experienceLevel}
              education={profile.basicInfo.education}
              opportunityStatus={profile.opportunityStatus}
              languages={profile.languages}
              onEditPress={() => modal.open("edit_basic")}
            />
          </>
        )}

        {tab === "skills" && (
          <SkillsSection
            skills={profile.skills}
            onEditPress={() => modal.open("edit_skills")}
          />
        )}

        {tab === "activity" && <ActivitySection />}

        <SettingsSection onBillingPress={() => navigation.navigate("Billing")} />
      </ScrollView>

      <ProfileEditModals
        modalKey={modal.modal.key}
        profile={profile}
        onClose={modal.close}
        onSaveHeader={(payload) => saveHeader(payload)}
        isSavingHeader={isSavingHeader}
        onSaveAbout={(about: string) => saveAbout(about)}
        isSavingAbout={isSavingAbout}
        onSaveBasicInfo={(payload) => saveBasicInfo(payload)}
        isSavingBasicInfo={isSavingBasicInfo}
        onSaveSkills={(skills) => saveSkills(skills)}
        isSavingSkills={isSavingSkills}
        languageCatalog={languageCatalog}
      />
    </>
  );
}

const scrollStyle = {
  backgroundColor: "#fff",
};
