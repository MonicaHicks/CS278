// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase compatibility
config.resolver.sourceExts.push('cjs'); // Add .cjs for firebase/auth compat
// This is the new line you should add in, after the previous lines
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
