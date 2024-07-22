module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
    plugins: ["react-native-reanimated/plugin"],
    plugins: [ [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
        logTimings: true,
        disableExtraction: process.env.NODE_ENV === 'development',
      },
    ],
    'react-native-reanimated/plugin',],
  };
};
