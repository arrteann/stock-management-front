<template>
  <div id="navbar">
    <h1>Stock Managment</h1>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {}
</script>


<style lang="scss" scoped>
#navbar {
  display: flex;

  background-color: #302542;

  padding: 0.5rem 0.9rem;
  margin: {
    bottom: 0.9rem;
  }

  box-shadow: 0.1rem 0.2rem 0.2rem rgba($color: #302542, $alpha: 0.3);

  h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 0.2rem;
  }
}
</style>