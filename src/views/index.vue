<template>
  <div class="container" v-cloak>
    <app-header />

    <div id="over-all-wrapper">
      <div id="content-wrapper">
        <div id="user-details-wrapper">
          <div id="polifix-wrapper">
            <div id="profile-pic-wrapper" v-if="data.avatarUrl != ''">
              <a :href="'https://github.com/' + username">
                <img id="avatar" :src="data.avatarUrl"
              /></a>
              <button id="set-status-btn" v-html="data.status.emojiHTML">
                <!-- <span class="mdi mdi-emoticon-excited-outline"></span> -->
              </button>
            </div>

            <span id="name" v-if="data.name !== ''">{{ data.name }}</span>
            <span id="user-name">{{ username }}</span>
            <span id="user-bio" v-if="data.bio !== ''"> {{ data.bio }}</span>
          </div>

          <button id="set-stat-btn2">
            <span
              class="mdi mdi-emoticon-excited-outline"
              v-if="data.isViewer"
            ></span>
            Set status
          </button>

          <button id="edit-profile-btn" v-if="data.isViewer">
            Edit profile
          </button>
          <button id="edit-profile-btn" v-else>Follow</button>

          <ul id="user-internal-links" v-if="data.followers && data.following">
            <li v-if="data.followers.totalCount > 0">
              <span
                style="color: #616972; margin-right: 5px"
                class="mdi mdi-account-supervisor-outline"
              ></span>
              <span style="color: #c9d1d9; margin-right: 5px">{{
                data.followers.totalCount
              }}</span>
              <a :href="'https://github.com/' + username + '?tab=followers'"
                >followers</a
              >
            </li>
            <li>
              <span class="dix" v-if="data.following.totalCount > 0"></span>
            </li>
            <li v-if="data.following.totalCount > 0">
              <span style="color: #c9d1d9">{{
                data.following.totalCount
              }}</span>
              <a
                style="margin-left: 5px"
                :href="'https://github.com/' + username + '?tab=following'"
                >following</a
              >
            </li>
            <li><span class="dix"></span></li>
          
            <li
              v-if="
                data.starredRepositories.totalCount &&
                data.starredRepositories.totalCount > 0
              "
            >
              <a
                style="margin-left: 3px;color:#fff"
                :href="'https://github.com/' + username + '?tab=stars'"
                ><span
                  style="color: #616972; margin-right: 2px"
                  class="mdi mdi-star-outline"
                ></span>
                {{
                  data.starredRepositories.totalCount
                }}</a
              >
            </li>
          </ul>

          <ul id="user-external-links">
            <li v-if="data.company != null">
              <span class="mdi mdi-office-building"></span> {{ data.company }}
            </li>
            <li v-if="data.location != null">
              <span class="mdi mdi-map-marker"></span> {{ data.location }}
            </li>
            <li v-if="data.email !== null && data.email !== ''">
              <a :href="'mailto:'+email"><span class="mdi mdi-email"></span> {{ data.email }}</a>
            </li>

            <li v-if="data.websiteUrl != ''">
              <a :href="'http://' + blog"
                ><span class="mdi mdi-link"></span> {{ data.websiteUrl }}</a
              >
            </li>
            <li v-if="data.twitterUsername != ''">
              <a :href="'https://twitter.com/' + data.twitterUsername"
                ><span class="mdi mdi-twitter"></span> @{{
                  data.twitterUsername
                }}</a
              >
            </li>
          </ul>

          <template v-if="data.isViewer">
            <!-- <br>
            <div  id="divider"></div>
              <span id="organizations-title">Organizations</span> 
           <ul id="organization-badge">
            <li>
              <img src="../assets/organizationimage.png" />
            </li>
            <li>
              <img src="../assets/organizationimage.png" />
            </li>
            <li>
              <img src="../assets/organizationimage.png" />
            </li>
          </ul>  -->
          </template>
          <!-- <tabmenu /> -->
        </div>

        <div id="dynamic-component-wrapper">
          <component :username="username" :is="activeComponent" />
        </div>
      </div>
    </div>

    <div id="footer" style="display: none">
      <span class="full-year"
        ><span class="mdi mdi-copyright"></span>
        <a href="https://xceldeveloper.com">xceldeveloper</a>
        {{ new Date().getFullYear() }}</span
      >
    </div>
  </div>
</template>

<script>
import appHeader from "../components/header.vue";
import tabmenu from "../components/tabmenu.vue";
import repositories from "../components/tabs/repositories.vue";
import { PROFILE } from "../queries/github";

export default {
  components: {
    appHeader,
    tabmenu,
    repositories: repositories,
  },
  apollo: {
    search: {
      query: PROFILE,
      variables() {
        return {
          user: `  user:${this.$route.params.username} `,
        };
      },
    },
  },
  data() {
    return {
      search: "",
      activeComponent: "repositories",
      name: "",
      username: "",
      avatar: "",
      followers_count: "",
      following_count: "",
      twitter_username: "",
      company: null,
      location: null,
      email: null,
      bio: null,
      blog: "",
      url: {
        followers: "",
        following: "",
        profile: "",
      },
    };
  },
  watch: {
    search: {
      immediate: true,
      handler(val) {
       // console.log(JSON.stringify(val, null, 2));
      },
    },
  },
  computed: {
    data() {
      if (this.search == "") {
        return {};
      } else {
        return this.search.edges[0].node;
      }
    },
  },
  mounted() {
    this.username = this.$route.params.username;
    // this.activeComponent =  this.$route.query.tab+""
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  width: 100%;
  padding: 0px;
  margin: 0px;
  display: block;
  background-color: #0d1117;
  overflow: auto;
}

#over-all-wrapper {
  min-height: 100vh;
}

#user-details-wrapper {
  width: 27%;
  height: auto;
  position: relative;
}

#profile-pic-wrapper {
  width: 270px;
  height: 270px;
  background-color: #0d1117;
  margin: 0px 7.5%;
  border-radius: 50%;
  position: absolute;
  top: -30px;
  border: 2px solid #393c41;
  box-shadow: 0px 0px 15px #202022;
  position: relative;
  z-index: 95;
}

#avatar {
  width: 100%;
  height: 100%;
  min-height: 100px;
  min-width: 100px;
  object-fit: cover;
  border-radius: 50%;
}

#set-status-btn {
  border: 0.5px solid #393c41;
  border-radius: 50%;
  height: 35px;
  text-align: center;
  font-size: 16px;
  width: 35px;
  outline-style: none;
  background-color: #202022;
  position: absolute;
  bottom: 30px;
  color: #616972;
  right: 5px;
}

#set-status-btn:hover {
  color: #c9d1d9;
  border: 0.5px solid #c9d1d9;
  cursor: pointer;
}

#name {
  display: block;
  font-size: 24px;
  color: #c9d1d9;
  padding: 0px 7.5%;
  font-weight: bold;
  text-align: left;
}

#user-name {
  display: block;
  font-size: 20px;
  color: #616972;
  padding: 2px 7.5%;
  text-align: left;
}

#user-bio {
  display: block;
  font-size: 17px;
  color: #c9d1d9;
  padding: 8px 7.5%;
  margin-top: 6px;
  text-align: left;
}

#edit-profile-btn {
  color: #c9d1d9;
  background-color: #393c41;
  border: none;
  padding: 10px 0px;
  outline-style: none;
  width: 85%;
  margin: 10px 7.5%;
  border-radius: 30px;
}

#edit-profile-btn:hover {
  padding: 9px 0px;
  border: 0.5px solid #c9d1d9;
  cursor: pointer;
}

#user-internal-links {
  list-style-type: none;
  padding: 0px;
  margin: 20px 1%;
}

#user-internal-links li {
  color: #616972;
  display: inline-block;
  font-size: 15px;
}

#user-internal-links li a:hover {
  color: cornflowerblue;
  cursor: pointer;
}

#user-internal-links li a {
  text-decoration: none;
  color: #616972;
}

.dix {
  height: 3px;
  width: 3px;
  border-radius: 50%;
  display: block;
  margin: 0px 6px;
  background-color: #fff;
}

#user-external-links {
  padding: 0px;

  list-style-type: none;
  color: #fff;
  margin: 10px 7.5%;
}

#user-external-links li {
  padding: 3px 0px;
  text-align: left;
  color: #ababaf;
}

#user-external-links li a {
  text-decoration: none;
  color: #ababaf;
}

#user-external-links li a:hover {
  color: cornflowerblue;
}

#divider {
  width: 85%;
  height: 1px;
  background-color: #616972;
  margin: 0px 7.5%;
}

#organizations-title {
  color: #c9d1d9;
  display: none;
  padding: 10px 0px 5px 7.5%;
}

#organization-badge {
  padding: 0px;
  height: auto;
  width: 85%;
  white-space: nowrap;
  overflow: auto;
  margin: 0px 7.5%;
  display: none;
}

#organization-badge li {
  margin: 3px 6px 0px 0px;
  display: inline-block;
  height: 50px;
  width: 50px;
  background-color: grey;
  border-radius: 7px;
  cursor: pointer;
}

#organization-badge li img {
  height: 100%;
  width: 100%;
  border-radius: 7px;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1000px) {
  #over-all-wrapper {
    width: 100%;
    margin: auto;
  }

  #content-wrapper {
    width: 100%;
    height: auto;
    display: flex;
  }

  #dynamic-component-wrapper {
    width: 100%;
    flex: 1;
  }

  #user-internal-links li {
    color: #616972;
    display: inline-block;
    font-size: 10px;
  }
}

@media only screen and (min-device-width: 1001px) {
  #over-all-wrapper {
    width: 75%;
    margin: auto;
  }

  #content-wrapper {
    width: 100%;
    height: auto;
    display: flex;
  }

  #dynamic-component-wrapper {
    min-height: 100vh;
    width: 100%;
    flex: 1;
  }
}

@media only screen and (min-device-width: 768px) {
  #set-stat-btn2 {
    display: none;
  }
}

@media only screen and (max-device-width: 767px) {
  #set-status-btn {
    display: none;
  }
  #user-details-wrapper {
    width: 100%;
    height: auto;
    position: unset;
  }

  #polifix-wrapper {
    white-space: nowrap;
    clear: both;
  }

  #profile-pic-wrapper {
    width: 60px;
    height: 60px;
    background-color: #0d1117;
    margin: 0px 0px 0px 7.5%;
    border-radius: 50%;
    position: unset;
    top: unset;
    border: 2px solid #393c41;
    box-shadow: 0px 0px 15px #202022;
    float: left;
    z-index: 0;
  }

  #user-name {
    display: inline-block;
    font-size: 20px;
    color: #616972;
    padding: 10px 5px;
    margin-left: 10px;
  }

  #set-stat-btn2 {
    color: #393c41;
    background-color: transparent;
    border: none;
    outline-style: none;
    width: 85%;
    margin: 10px 7.5% 0px 7.5%;
    border-radius: 30px;
    border: 0.5px solid #393c41;
    text-align: left;
    padding: 10px;
  }
}

#footer {
  height: 100px;
  width: 90%;
  margin: auto;
  border-top: 1px groove #616972;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.full-year a {
  color: #fff;
  text-decoration: none;
}
</style>
