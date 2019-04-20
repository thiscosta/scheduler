<template>
  <div>
    <p class="display-2 text-uppercase font-weight-normal">Estabelecimentos</p>
    <v-text-field
      v-model="searchText"
      label="Procurar um estabelecimento"
      light
      flat
      hide-details
      clearable
      clear-icon="mdi-close-circle-outline"
    ></v-text-field>

    <p style="color:red;">{{ searchText }}</p>
    <v-list two-lines>
      <template v-for="(establishment) in establishments">
        <v-list-tile :key="establishment.title" avatar @click="() => {}">
          <v-list-tile-avatar>
            <img :src="establishment.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="establishment.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="establishment.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ["establishments"]
}
</script>

<style>
</style>
