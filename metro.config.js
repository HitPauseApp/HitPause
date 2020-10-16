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