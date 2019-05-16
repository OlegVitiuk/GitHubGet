<template>
  <div class="container">
    <div class="contacts">
      <a href="https://github.com/OlegVitiuk">Created By</a>
      <a href="https://github.com/OlegVitiuk/GitHubGet">Source code</a>
    </div>
    <div v-if="isDataLoaded">
      <div class="userInfo">
        <span class="userInfo_name">{{userInfo.login}}</span>
        <img v-bind:src="userInfo.avatar_url" class="userInfo_avatar">
      </div>
      <div class="repos">
        <h3 class="repos_title">Repositories</h3>
        <div class="repos_container">
          <div v-bind:key="repo.id" v-for="repo in userInfo.repos" class="repo">{{repo.name}}</div>
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
  data: () => ({
    userInfo: {
      login: null,
      avatar_url: null,
      repos: null
    },
    isDataLoaded: false
  }),
  mounted: function() {
    this.setAccessToken();
  },
  methods: {
    setLoader: function(value) {
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

      this.setLoader(false);
      const res = await Promise.all([
        getUserData(accessToken),
        getUserRepos(accessToken)
      ]);
      this.setLoader(true);
      const { avatar_url, login } = res[0].data;
      this.userInfo = { repos: res[1].data, avatar_url, login };
      console.log(res, "data");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacts {
  position: fixed;
  background-color: #6da9a2;
  padding: 15px;
  left: 140px;
  top: 60px;
}
.container {
  width: 40%;
  background-color: #001f3f;
  text-align: center;
  vertical-align: center;
  color: white;
}
.userInfo {
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.repos_container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 75px;
  height: 75px;
}
.repo {
  border: 1px solid #dddddd;
  padding: 15px;
  width: 50%;
}
</style>
