import { ScrollView } from "react-native";
import { useState } from "react";
import Header from "@/components/ui/Header";
import { spacing } from "@/theme";
import { useModalState } from "./hooks/useModalState";
import { ProfileEditModals } from "@/screens/profile/modals/ProfileEditModals";

import ProfileHeader from "@/screens/profile/components/ProfileHeader";
import { ProfileTabs } from "@/screens/profile/components/ProfileTabs";
import { AboutSection } from "@/screens/profile/components/sections/AboutSection";
import { BasicInfoSection } from "@/screens/profile/components/sections/BasicInfoSection";
import { SkillsSection } from "@/screens/profile/components/sections/SkillsSection";
import { ActivitySection } from "@/screens/profile/components/sections/ActivitySection";

import { ProfileData } from "./types";
import { mockProfile } from "./mock";

export default function ProfileScreen() {
  const [tab, setTab] = useState<"resume" | "skills" | "activity">("resume");
  const [profile, setProfile] = useState<ProfileData>(mockProfile);

  const modal = useModalState();

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
        <Header title={"Mi Perfil"} />

        <ProfileHeader
          profile={profile}
          onEditPress={() => modal.open("edit_header")}
        />

        <ProfileTabs active={tab} onChange={setTab} />

        {tab === "resume" && (
          <>
            <AboutSection onEditPress={() => modal.open("edit_about")} />
            <BasicInfoSection onEditPress={() => modal.open("edit_basic")} />
          </>
        )}

        {tab === "skills" && (
          <SkillsSection onEditPress={() => modal.open("edit_skills")} />
        )}

        {tab === "activity" && <ActivitySection />}
      </ScrollView>

      <ProfileEditModals
        modalKey={modal.modal.key}
        profile={profile}
        onClose={modal.close}
        onSaveHeader={(payload) =>
          setProfile((p) => ({
            ...p,
            avatarUrl: payload.avatarUrl,
            basicInfo: {
              ...p.basicInfo,
              fullName: payload.fullName,
              headline: payload.headline,
              location: payload.location,
              website:
                payload.contacts.find((c) => c.type === "Website")?.value ??
                p.basicInfo.website,
            },
            contacts: payload.contacts,
          }))
        }
        onSaveAbout={(about: string) => setProfile((p) => ({ ...p, about }))}
        onSaveBasicInfo={(payload) =>
          setProfile((p) => ({
            ...p,
            basicInfo: {
              ...p.basicInfo,
              experienceLevel: payload.experienceLevel,
              education: payload.education,
            },
            opportunityStatus: payload.opportunityStatus,
            languages: payload.languages.map((l, idx) => ({
              id: `local-${idx}`,
              name: l.name,
              level: l.level,
            })),
          }))
        }
        onSaveSkills={(skills) => setProfile((p) => ({ ...p, skills }))}
      />
    </>
  );
}
