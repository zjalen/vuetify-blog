// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
        light: {
            primary: colors.teal,
            secondary: colors.teal,
            tertiary: colors.orange,
            accent: colors.shades.black,
            error: colors.red.accent3,
        },
        dark: {
            primary: colors.shades,
            // secondary: colors.lightBlue,
            tertiary: colors.orange,
            accent: colors.shades.black,
            error: colors.red.accent3,
        },
    },
    light: true,
    options: {
        customProperties: true,
    },
  },
})
