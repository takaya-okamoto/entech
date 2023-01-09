/** @type {import('next').NextConfig} */

// const intercept = require("intercept-stdout");
var withInterceptStdout = require("next-intercept-stdout");
// safely ignore recoil stdout warning messages
// function interceptStdout(text) {
//   if (text.includes("Duplicate atom key")) {
//     return "";
//   }
//   return text;
// }
// intercept(interceptStdout);

module.exports = withInterceptStdout(
  {
    reactStrictMode: true,
    optimizeFonts: true,
  },
  (text) => (text.includes("Duplicate atom key") ? "" : text)
);
// const nextConfig = {
//   reactStrictMode: true,
//   // swcMinify: true,
// };
//
// module.exports = nextConfig;
