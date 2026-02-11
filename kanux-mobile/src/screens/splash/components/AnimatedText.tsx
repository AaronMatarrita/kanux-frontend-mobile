import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated, Easing } from "react-native";

const WORD = ["K", "á", "n", "u", "x"];

export function AnimatedText() {
  const letterOpacities = useRef(WORD.map(() => new Animated.Value(0))).current;
  const letterTranslateY = useRef(
    WORD.map(() => new Animated.Value(14)),
  ).current;
  const letterScale = useRef(WORD.map(() => new Animated.Value(0.97))).current;

  useEffect(() => {
    const lettersIn = Animated.stagger(
      90,
      WORD.map((_, i) =>
        Animated.parallel([
          Animated.timing(letterOpacities[i], {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(letterTranslateY[i], {
            toValue: 0,
            duration: 260,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.spring(letterScale[i], {
            toValue: 1,
            friction: 7,
            tension: 140,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    lettersIn.start();
  }, [letterOpacities, letterTranslateY, letterScale]);

  return (
    <Animated.View style={styles.textContainer}>
      {WORD.map((letter, index) => (
        <Animated.Text
          key={`${letter}-${index}`}
          style={[
            styles.letter,
            {
              opacity: letterOpacities[index],
              transform: [
                { translateY: letterTranslateY[index] },
                { scale: letterScale[index] },
              ],
            },
          ]}
        >
          {letter}
        </Animated.Text>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  letter: {
    fontSize: 36,
    fontWeight: "700",
    fontFamily: "Comfortaa",
    color: "#284B8C",
    marginHorizontal: 2,
    letterSpacing: 0.8,
  },
});
