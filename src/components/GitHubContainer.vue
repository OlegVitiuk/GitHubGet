<template>
  <div class="container">hhhh</div>
</template>

<script>
import { clientId, clientSecret } from "../config";

export default {
  name: "GitHubContainer",
  mounted: function() {
    this.setAccessToken();
  },
  methods: {
    setAccessToken: async () => {
      const params = new URLSearchParams(window.location.search);

      if (params.has("code")) {
        const code = params.get("code");

        try {
          const res = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
              client_id: clientId,
              client_secret: clientSecret,
              code
            }
          );
          console.log(res);
          localStorage.setItem("accessToken", res.data.access_token);
        } catch (e) {
          console.err(e.message);
        }
      } else {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);

        if (!accessToken) {
          window.location.replace(
            `https://github.com/login/oauth/authorize?client_id=${clientId}`
          );
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
