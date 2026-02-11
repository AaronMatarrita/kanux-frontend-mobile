import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "@/context/AuthContext";
import { feedService } from "@/services/feed.service";
import { colors, commonStyles } from "@/theme";
import Header from "@/components/ui/Header";
import Avatar from "@/components/messages/Avatar";
import { ArrowLeft } from "lucide-react-native";

const MAX_LENGTH = 500;

type FeedStackParamList = {
  FeedList: { updatedPost: any };
};

const CreatePostScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const { session } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      const response = await feedService.createPost({ content: trimmed });
      const post = response.data;

      if (!post.author && session?.user?.profile) {
        post.author = {
          id: session.user.id,
          first_name: session.user.profile.first_name,
          last_name: session.user.profile.last_name,
          title: session.user.profile.title,
          image_url: session.user.profile.photo_url || undefined,
        };
      }
      navigation.navigate("FeedList", { updatedPost: post });
    } catch (err) {
      Alert.alert("Error", "No se pudo crear el post. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const user = session?.user?.profile;
  const avatarUrl = user?.photo_url || undefined;
  const userName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "";
  const userTitle = user?.title || "";
  const userDesc = user?.bio || "";

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Header
        title="Nuevo post"
        leftIcon={<ArrowLeft size={22} color={colors.textColors.inverted} />}
        onLeftPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
      >
        <View style={styles.formWrap}>
          <View style={styles.userRow}>
            <Avatar
              size={44}
              source={avatarUrl ? { uri: avatarUrl } : undefined}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              {!!userTitle && (
                <Text
                  style={styles.userTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.85}
                >
                  {userTitle}
                </Text>
              )}
              {!!userDesc && (
                <Text
                  style={styles.userDesc}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.85}
                >
                  {userDesc}
                </Text>
              )}
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="¿Qué quieres compartir?"
            placeholderTextColor={colors.gray400}
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={MAX_LENGTH}
            editable={!loading}
            textAlignVertical="top"
          />
          <View style={styles.footerRow}>
            <Text style={styles.counter}>
              {content.length}/{MAX_LENGTH}
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                !content.trim() || loading ? styles.buttonDisabled : null,
              ]}
              onPress={handleCreate}
              disabled={!content.trim() || loading}
              activeOpacity={0.7}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Publicar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgrounds.primary,
  },
  formWrap: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
    minWidth: 0,
  },
  userName: {
    color: colors.textColors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  userTitle: {
    color: colors.textColors.tertiary,
    fontSize: 13,
    marginTop: 2,
  },
  input: {
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    color: colors.textColors.primary,
    fontSize: 16,
    padding: 16,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counter: {
    color: colors.gray400,
  },
  button: {
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  userDesc: {
    color: colors.gray400,
    fontSize: 12,
    marginTop: 2,
    maxWidth: "100%",
    lineHeight: 16,
    flexShrink: 1,
  },
  buttonDisabled: {
    backgroundColor: colors.gray300,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CreatePostScreen;
