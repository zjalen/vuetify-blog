// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.lightGreen,
        secondary: colors.teal,
        tertiary: colors.orange,
        accent: colors.shades,
        error: colors.red,
        grey: colors.grey,
      },
      dark: {
        primary: colors.shades,
        secondary: colors.blueGrey,
        tertiary: colors.orange,
        accent: colors.shades,
        error: colors.red,
        grey: colors.grey,
      },
    },
    dark: true,
    options: {
      customProperties: true,
    },
  },
})
