import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { colors } from "@theme";

interface AvatarProps {
  source?: ImageSourcePropType;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 48,
}) => {
  if (source) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Image
          source={source}
          style={[styles.image, { width: size, height: size }]}
          resizeMode="cover"
          onError={(e) => {
            console.log("Error loading image:", e.nativeEvent.error);
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        styles.defaultAvatar,
        { width: size, height: size },
      ]}
    >
      <View
        style={[
          styles.defaultHead,
          {
            width: size * 0.5,
            height: size * 0.5,
            top: size * 0.05,
          },
        ]}
      />
      <View
        style={[
          styles.defaultBody,
          {
            width: size * 0.7,
            height: size * 0.7,
            top: size * 0.4,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: colors.gray200,
  },
  image: {
    borderRadius: 24,
    width: "100%",
    height: "100%",
  },
  defaultAvatar: {
    backgroundColor: colors.gray200,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultHead: {
    position: "absolute",
    backgroundColor: colors.gray400,
    borderRadius: 25,
  },
  defaultBody: {
    position: "absolute",
    backgroundColor: colors.gray400,
    borderRadius: 35,
  },
});

export default Avatar;
