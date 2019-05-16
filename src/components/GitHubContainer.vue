<template>
  <div class="container">hhhh</div>
</template>

<script>
import { clientId, clientSecret } from "../config";
import { getUserData } from "@/api/requests";
import axios from "axios";

export default {
  name: "GitHubContainer",
  mounted: function() {
    this.setAccessToken();
  },
  methods: {
    setAccessToken: async function() {
      const params = new URLSearchParams(window.location.search);

      if (params.has("code")) {
        const code = params.get("code");

        try {
          const res = await axios.post(
            "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
            {
              client_id: clientId,
              client_secret: clientSecret,
              code
            }
          );
          console.log(res, "RES");
          this.parseToken(res.data);
        } catch (e) {
          console.error(e.message);
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
    },

    parseToken: textToParse => {
      const token = textToParse.match(/access_token=(.*)&scope/);
      localStorage.setItem("accessToken", token[1]);
    },

    getUserData: async () => {
      const data = await Promise.all([getUserData(), getUserRepos()]);
      console.log(data, "data");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
