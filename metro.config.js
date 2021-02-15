/**
 * Metro configuration for React Native with svg support
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();

module.exports = {
  transformer: {
   minifierConfig: {
     keep_classnames: true, // FIX typeorm
     keep_fnames: true, // FIX typeorm
     mangle: {
       // toplevel: false,
       keep_classnames: true, // FIX typeorm
       keep_fnames: true, // FIX typeorm
     },
     output: {
       ascii_only: true,
       quote_style: 3,
       wrap_iife: true,
     },
     sourceMap: {
       includeSources: false,
     },
     toplevel: false,
     compress: {
       // reduce_funcs inlines single-use functions, which cause perf regressions.
       reduce_funcs: false,
     },
   },
 },
};