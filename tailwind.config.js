import { environment } from './apps/time-tracking/src/environments/environment';

module.exports = {
  purge: {
    enabled: environment.production,
    content: [
      "./src/**/*.{html,ts}",
      "./libs/**/*{html,ts}"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
