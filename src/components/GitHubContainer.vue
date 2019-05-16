<template>
  <div class="container">
    <div v-if="isDataLoaded">
      <div class="userInfo">
        <span class="userInfo_name">{{userName}}</span>
        <img src="avatar_url" class="userInfo_avatar">
      </div>
      <div class="repos">
        <h3 class="repos_title">Repositories</h3>
        <div class="repos_container" v-bind:key="repo.id" v-for="repo in userInfo.repos">
          <div class="repo">{{repo.name}}</div>
        </div>
      </div>
    </div>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
import { clientId, clientSecret } from "../config";
import { getUserData, getUserRepos } from "@/api/requests";
import axios from "axios";

export default {
  name: "GitHubContainer",
  data: {
    userInfo: {
      login: null,
      avatar_url: null,
      repos: null
    },
    isDataLoaded: false
  },
  mounted: function() {
    this.setAccessToken();
  },
  methods: {
    isDataLOading: function(value) {
      this.isDataLoaded = value;
    },

    setAccessToken: async function() {
      const params = new URLSearchParams(window.location.search);

      if (params.has("code")) {
        const code = params.get("code");
        history.replaceState({}, "", "/");

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

        if (!accessToken) {
          window.location.replace(
            `https://github.com/login/oauth/authorize?client_id=${clientId}`
          );
        } else {
          console.log("gggg");
          this.getUserData();
        }
      }
    },

    parseToken: function(textToParse) {
      const token = textToParse.match(/access_token=(.*)&scope/);
      localStorage.setItem("accessToken", token[1]);
      this.getUserData();
    },

    getUserData: async function() {
      const accessToken = localStorage.getItem("accessToken");

      this.isDataLOading(true);
      const res = await Promise.all([
        getUserData(accessToken),
        getUserRepos(accessToken)
      ]);
      this.isDataLOading(false);
      const { avatar_url, login } = res[0].data;
      this.userInfo = { repos: res[1].data, avatar_url, login };
      console.log(res, "data");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 70%;
  background-color: #001f3f;
  text-align: center;
  vertical-align: center;
  color: white;
}
.userInfo {
  display: flex;
  margin-bottom: 20px;
}

.userInfo_name {
  color: #fff;
  font-size: 24px;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 20px;
}

.repos_title {
  font-size: 24px;
  font-style: italic;
  color: white;
}

.userInfo_avatar {
  width: 50px;
  height: 50px;
}
.repo {
  background-color: #dddddd;
  padding: 15px;
  border: 2px solid #111111;
}
</style>
