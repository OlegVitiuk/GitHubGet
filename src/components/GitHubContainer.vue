<template>
  <div class="container">hhhh</div>
</template>

<script>
import { clientId, clientSecret } from "../config";

export default {
  name: "GitHubContainer",
  mounted: function() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("code")) {
      localStorage.setItem("accessToken", params.get("code"));
    }

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    if (!accessToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?client_id=${clientId}`
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
