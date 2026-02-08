import { ScrollView } from "react-native";
import { useState } from "react";
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

import { useTalentProfile } from "./hooks/useTalentProfile";
import { useProfileEdits } from "./hooks/useProfileEdits";

export default function ProfileScreen() {
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
  const { isSavingAbout, saveAbout, isSavingBasicInfo, saveBasicInfo } =
    useProfileEdits(profile, catalogs, setProfile);

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
      </ScrollView>

      <ProfileEditModals
        modalKey={modal.modal.key}
        profile={profile}
        onClose={modal.close}
        onSaveHeader={(payload) =>
          setProfile((p) =>
            p
              ? {
                  ...p,
                  avatarUrl: payload.avatarUrl,
                  basicInfo: {
                    ...p.basicInfo,
                    fullName: payload.fullName,
                    headline: payload.headline,
                    location: payload.location,
                    website:
                      payload.contacts.find((c) => c.type === "Website")
                        ?.value ?? p.basicInfo.website,
                  },
                  contacts: payload.contacts,
                }
              : p,
          )
        }
        onSaveAbout={(about: string) => saveAbout(about)}
        isSavingAbout={isSavingAbout}
        onSaveBasicInfo={(payload) => saveBasicInfo(payload)}
        isSavingBasicInfo={isSavingBasicInfo}
        onSaveSkills={(skills) => setProfile((p) => (p ? { ...p, skills } : p))}
        languageCatalog={languageCatalog}
      />
    </>
  );
}

const scrollStyle = {
  backgroundColor: "#fff",
};
