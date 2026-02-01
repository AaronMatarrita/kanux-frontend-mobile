module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@": "./src",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@theme": "./src/theme",
            "@navigation": "./src/types/navigation",
            "@app": "./src/app",
            "@services": "./src/services",
            "@context": "./src/context",
            "@types": "./src/types",
            "@lib": "./src/lib",
          },
        },
      ],
    ],
  };
};
