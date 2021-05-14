<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";

@Component({
  name: "app",
  components: {
    Navbar,
  },
})
export default class App extends Vue {}
</script>
