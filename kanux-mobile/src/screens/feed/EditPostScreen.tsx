import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { FeedPost } from "./types";
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
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";
import { colors, commonStyles } from "@/theme";
import Header from "@/components/ui/Header";
import { ArrowLeft } from "lucide-react-native";
import { feedService } from "@/services/feed.service";

const MAX_LENGTH = 500;

type FeedStackParamList = {
  FeedList: { updatedPost: any } | undefined;
  CreatePost: undefined;
  FeedPostDetail: { post: any; focusComments?: boolean };
  EditPost: { post: FeedPost };
};

const EditPostScreen = () => {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const route = useRoute();
  const { post } = route.params as { post: FeedPost };
  const [content, setContent] = useState(post?.content || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      const response = await feedService.updatePost(post.id, {
        content: trimmed,
      });
      // Toast.show({
      //   type: "success",
      //   text1: "Post actualizado",
      //   text2: "Tu publicación fue editada exitosamente.",
      // });
      navigation.navigate("FeedList", { updatedPost: response.data });
    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar el post. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Header
        title="Editar post"
        leftIcon={<ArrowLeft size={22} color={colors.textColors.inverted} />}
        onLeftPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
      >
        <View style={styles.formWrap}>
          <TextInput
            style={styles.input}
            placeholder="¿Qué quieres compartir?"
            placeholderTextColor={colors.gray400}
            value={content}
            onChangeText={setContent}
            maxLength={MAX_LENGTH}
            multiline
            textAlignVertical="top"
            autoFocus
          />
          <View style={styles.footerRow}>
            <Text style={styles.counter}>
              {content.length}/{MAX_LENGTH}
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                (!content.trim() || loading) && styles.buttonDisabled,
              ]}
              onPress={handleUpdate}
              disabled={!content.trim() || loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Guardar</Text>
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
  buttonDisabled: {
    backgroundColor: colors.gray300,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditPostScreen;
