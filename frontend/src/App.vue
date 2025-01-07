<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script>
import HomeView from './views/HomeView.vue';

export default {
  components: {
    HomeView
  }
};
</script>

<style lang="scss">
#app {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}
</style>
