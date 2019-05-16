<template>
  <div id="app">
    <GitHubContainer/>
  </div>
</template>

<script>
import GitHubContainer from "./components/GitHubContainer";

export default {
  name: "App",
  components: {
    GitHubContainer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
