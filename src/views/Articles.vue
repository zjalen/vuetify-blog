<template>
    <v-container>
      <v-row dense>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="$vuetify.theme.currentTheme.secondary.lighten3"
            outlined
            hover
          >
            <div class="d-flex flex-no-wrap">
              <v-avatar
                class="ma-3"
                size="175"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>

              <v-row dense>
                <v-col :cols="12">
                    <v-card-title
                      class="headline"
                      v-text="item.title"
                    ></v-card-title>

                    <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                    <v-card-text class="text--primary">
                      <div>Whitehaven Beach</div>
                    </v-card-text>

                    <v-card-actions>
                      
                      <v-btn
                        class="ma-2"
                        color="secondary"
                        outlined
                      >
                        <v-icon left>mdi-pencil</v-icon> 分类
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="ma-2"
                        color="secondary accent-4"
                        outlined
                      >
                        <v-icon left>mdi-pencil</v-icon> 系列
                      </v-btn>
                      
                    </v-card-actions>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
    }),
  }
</script>