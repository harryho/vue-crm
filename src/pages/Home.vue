<template>
  <v-card
    max-width="450"
    class="mx-auto"
  >

    <v-app-bar
      dark
      color="#ffa500"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ toolbarTitle }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#ffa500"
            dark
          >
            <v-card-title class="headline">
              {{ cardTitle }}
            </v-card-title>

            <v-card-subtitle>
                {{ cardSubTitle }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn text>
                {{ questions }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.subTitle"></v-card-subtitle>

                <!-- <v-card-action>
                  <v-btn
                    v-if="item.artist === 'Ellie Goulding'"
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-play</v-icon>
                  </v-btn>

                  <v-btn
                    v-else
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    START RADIO
                  </v-btn>
                </v-card-action> -->
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
        <v-carousel
        :continuous="false"
        :cycle="cycle"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="300"
        >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
        >
            <v-sheet
            :color="colors[i]"
            height="100%"
            tile
            >
            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
                <div class="display-3">
                {{ slide }}
                </div>
            </v-row>
            </v-sheet>
        </v-carousel-item>
        </v-carousel>
    </v-container>
    <v-footer
      dark
      padless
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-title class="teal">
          <strong class="subheading">Conecte-se conosco</strong>

          <v-spacer></v-spacer>

          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-1"
            dark
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          color: '#2980B9',
          src: 'https://lh3.googleusercontent.com/proxy/hrh8jrHHKNW8JyR8tDQoT9AzJ9DL-hgIf7Y6gqFFUhMnIAefroEHjDkwy6ph9x-1vDRcoYsbUpispMhnmht8aHPJ3maNlCBmeQCqU2XPlrd0vtdItwc',
          title: 'Produtos',
          subTitle: 'Produtos e serviços de machine learning inovadores em uma plataforma confiável.',
        },
        {
          color: '#58D68D',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnbG1rbMnQkAJeqy8GG1JJIqDO3EAuEXDVxA&usqp=CAU',
          title: 'AI Platform',
          subTitle: 'A AI Platform, nosso ambiente de desenvolvimento de ciência de dados baseado em código, permite que desenvolvedores de ML e cientistas de dados assumam projetos.',
        },
        {
          color: '#82E0AA',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvqQ7F3ZToOxhEFVjZE7Rb3XBd95vgR9LVSQ&usqp=CAU',
          title: 'IA facilitam',
          subTitle: 'Os elementos essenciais de IA facilitam a inclusão de visão, linguagem, conversa e dados estruturados nos seus aplicativos.',
        },
        {
          color: '#229954',
          src: 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/03/02/plataforma-brasileira-jobecam-usa-ia-para-conectar-profissionais-a-empregadores.jpg',
          title: 'AI Hub',
          subTitle: 'O AI Hub, nosso repositório hospedado de componentes de IA prontos para usar, estimula a experimentação e a colaboração dentro da sua organização.',
        },
      ],
      toolbarTitle: 'Analista de CRM',
      cardTitle: 'Gerar valor sobre seus dados',
      cardSubTitle: 'Produtos desenvolvidos com base em algoritmos de  aprendizado de maquina, altamente adaptaveis para atender o seu negocio.',
      questions: 'Leia mais...',
      colors: [
          'green',
          'secondary',
          'yellow darken-4',
          'red lighten-2',
          'orange darken-1',
        ],
        cycle: false,
        slides: [
          'Produtos',
          'AI Platform',
          'IA facilitam',
          'AI Hub',
          'Outros',
        ],
        icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>