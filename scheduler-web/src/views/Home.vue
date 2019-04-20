<template>
  <div class="home">
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
    <v-container grid-list-md class="establishments">
      <v-layout row wrap>
        <v-flex xs12 sm12 md8>
          <Establishments :establishments="establishments"/>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <v-layout>
            <v-flex xs12>
              <v-card>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>{{ card_text }}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Establishments from "../components/Establishments";

export default {
  name: "home",
  components: { Establishments },
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      establishments: [
        {
          avatar:
            "data:image/jpeg;base64,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",
          title: "Papatudo Autolanches",
          subtitle:
            "Não entregamos na empresa IBM. Por favor, evite o transtorno"
        },
        {
          avatar:
            "https://0.kekantoimg.com/5T6J6RiTRnrjYhugkxxRhjlLULE=/300x300/s3.amazonaws.com/kekanto_pics/pics/816/1640816.jpg",
          title: "Fazendinha Night Club",
          subtitle: "Sem termpo irmão"
        }
      ],
      card_text: ''
    };
  }
};
</script>


<style>
.establishments {
  margin-top: 7vh;
}
</style>