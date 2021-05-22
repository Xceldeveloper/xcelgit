<template>
  <div id="containerx" v-cloak v-if="canShow">
    <div id="more-sec-one">
      <input type="text" id="find-repo-input" placeholder="Find a repository" />

      <div id="sub-sec">
        
        <div class="dropdown">
          <button @click="showFcunction(0)" class="sub-btn dropbtn">
            Type
            <span class="mdi mdi-chevron-down"></span>
          </button>
          <div id="myDropdown" class="dropdown-wrapper">
            <span class="dropdown-title">Select type</span>
            <ul id="dropdown-content">
              <li  @click="repo_type = 'fork:true '"
                :class="[
                  repo_type == 'fork:true ' ? 'active-dropdown' : '',
                ]">All</li>

               <!-- <li  @click="repo_type = 'is:public'"
                :class="[
                  repo_type == 'is:public' ? 'active-dropdown' : '',
                ]">Public</li> -->

               <!-- <li  @click="repo_type = 'is:private'"
                :class="[
                  repo_type == 'is:private' ? 'active-dropdown' : '',
                ]">Private</li> -->

               <!-- <li  @click="repo_type = 'is:source'"
                :class="[
                  repo_type == 'is:source' ? 'active-dropdown' : '',
                ]">Sources</li> -->

               <li  @click="repo_type = 'fork:true'"
                :class="[
                  repo_type == 'fork:true' ? 'active-dropdown' : '',
                ]">Forks</li>

               <li  @click="repo_type = 'archived:true'"
                :class="[
                  repo_type == 'archived:true' ? 'active-dropdown' : '',
                ]">Archived</li>

               <li  @click="repo_type = ''"
                :class="[
                  repo_type == 'mirror:true' ? 'active-dropdown' : '',
                ]">Mirrors</li>
            </ul>
          </div>
        </div>

        <div class="dropdown">
          <button @click="showFcunction(1)" class="sub-btn dropbtn">
            Language
            <span class="mdi mdi-chevron-down"></span>
          </button>
          <div id="myDropdown2" class="dropdown-wrapper">
            <span class="dropdown-title">Select Language</span>
            <ul id="dropdown-content">
              <li :class="[  repo_language_filter == '' ? 'active-dropdown' : '']" @click="repo_language_filter = ''" >All</li>
               <li   :class="[  repo_language_filter == lang ? 'active-dropdown' : '']"    v-for="(lang,index) in all_languages" :key="index" @click="repo_language_filter = lang">{{lang}}</li>
            </ul>
          </div>
        </div>

        <div class="dropdown">
          <button @click="showFcunction(2)" class="sub-btn dropbtn">
            Sort
            <span class="mdi mdi-chevron-down"></span>
          </button>
          <div id="myDropdown3" class="dropdown-wrapper">
            <span class="dropdown-title">Select Order</span>
            <ul id="dropdown-content">
              <li
                @click="repo_sort_order = 'sort:updated-desc'"
                :class="[
                  repo_sort_order == 'sort:updated-desc'
                    ? 'active-dropdown'
                    : '',
                ]"
              >
                Last updated
              </li>
              <li
                @click="repo_sort_order = 'sort:stars-desc'"
                :class="[
                  repo_sort_order == 'sort:stars-desc' ? 'active-dropdown' : '',
                ]"
              >
                Stars
              </li>
            </ul>
          </div>
        </div>
        <!-- 
        <button id="create-repo-btn">
          <span class="mdi mdi-book-play-outline"></span> New
        </button> -->
      </div>
      <br />
    </div>

    <div v-if="errorLoading && !loading" id="error-wrapper" @click="getRepos">
      Error Loading repositories tap to retry
    </div>

    <!-- <div>
        <span v-html="filter_remark"></span>
    </div> -->
    <div class="repo-cover" v-for="(repo, index) in repositories" :key="index">
      <div class="inner-rep-cover">
        <div class="text-cover">
          <span class="repo-name">
            <a :href="repo.url">{{ repo.name }}</a>
          </span>

          <br v-if="repo.description != null" />

          <span v-if="repo.description != null" class="repo-desc">{{
            repo.description
          }}</span
          ><br />
          <div style="margin-top: 10px; overflow: auto">
            <span
              class="repo_topics"
              v-for="(topic, index) in repo.repositoryTopics.nodes"
              :key="index"
            >
              {{
                topic.resourcePath.substring(
                  topic.resourcePath.lastIndexOf("/") + 1,
                  topic.resourcePath.length
                )
              }}
            </span>
          </div>

          <span class="repo-datex">
            <span v-if="repo.primaryLanguage != null">
              <span
                v-if="repo.primaryLanguage.color !== undefined"
                :style="
                  'border-radius:50%;margin-right:10px;height:10px;width:10px;background-color:' +
                  repo.primaryLanguage.color
                "
              ></span>
              <b>{{ repo.primaryLanguage.name }}</b>
            </span>

            <span style="word-spacing: 0px" v-if="repo.stargazerCount > 0">
              <span class="mdi mdi-star-outline"></span>
              {{ repo.stargazerCount }}
            </span>

            <span v-if="repo.forkCount > 0"
              ><span class="mdi mdi-source-fork"></span>
              {{ repo.forkCount }}</span
            >

            <span> Updated {{ formatTime(moment, repo.updatedAt) }} </span>
          </span>
        </div>
        <div class="actn-cover">
          <button class="star-repo-btn">
            <span class="mdi mdi-star-outline"></span> Star
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment-timezone");
import { REPOSITORIES,ALL_LANGUAGES } from "../../queries/github";
export default {
  props: {
    username: {
      default: "",
    },
  },
  data() {
    return {
      moment: moment,
      repositories: [],
      errorLoading: false,
      loading: false,
      repositories: [],
      canShow: false,
      all_languages:[],
      repo_type: "fork:true ",
      repo_language_filter: "",
      repo_sort_order: "sort:updated-desc",
       language_remark:"",
       type_remark:"",
       sort_remark:"",
      filter_remark:""
    };
  },
  async mounted() {
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-wrapper");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };

    setTimeout(() => {
      this.canShow = true;
    }, 1000);

   await this.getRepos();
   //  console.log(JSON.stringify(this.repositories, null, 2));

     this.getAll_Languages();
  },
  methods: {
    showFcunction(which) {
      if (which == 0) {
        document.getElementById("myDropdown").classList.toggle("show");
      } else if (which == 1) {
        document.getElementById("myDropdown2").classList.toggle("show");
      } else {
        document.getElementById("myDropdown3").classList.toggle("show");
      }
    },

    async getRepos() {
      this.repositories = [];
      let data = await this.$apollo.query({
        query: REPOSITORIES,
        variables: { options: this.options },
      });
      this.repositories = data.data.search.edges.map((e) => {
        return e.node;
      });
    },

    formatTime(moment, date) {
      var t = moment(date).from(new Date().toISOString());

      var isMOnth = /month|months/.test(t);
       if (isMOnth) {
        return (
          "on " +
          moment(date).calendar(null, {
            lastDay: "dd, LT",
            lastWeek: "MMM D",
            sameElse: "MMM D YYYY ",
          })
        );
      } else {
        return t;
      }
    },

    async getAll_Languages(){
      let {data} = await this.$apollo.query({
        query: ALL_LANGUAGES,
        variables: { user: 'fork:true user:'+this.username },
      });

      this.all_languages = [];

    
       data.search.edges.map((e)=>{
       return e.node.languages.nodes.map((e)=>{
         if(this.all_languages.indexOf(e.name) == -1){
         this.all_languages.push(e.name)
         }

         return e.name});
      });

   console.log(JSON.stringify(this.all_languages,null,2));
      //console.log(data);
    }
  },
  computed: {
    options() {
      let options = "";

      //work on sort order 
      options += this.repo_sort_order + " ";

      if (this.repo_type != "") {
        options += this.repo_type + " ";
      }

      // work on language filter (can't be empty)
      if(this.repo_language_filter == ""){
      this.all_languages.map((e) => {
        options += "language:" + e + " ";
      });
      console.log("not empty")
      }else{
        options += "language:" + this.repo_language_filter.toLowerCase() + " "
      }

      console.log(options)
      

      return (options += "user:" + this.username);
    },
  },
  watch: {
    repositories:{
      immediate:true,
      handler(val){
        console.log(JSON.stringify(val,null,2));
      }
    },
      username() {
        this.getRepos();
      },
    repo_sort_order(val) {
      this.getRepos();
      this.sort_remark = val == 'sort:updated-desc' ? 'sorted by <b>last updated</b>' : 'sorted by <b>stars</b>'
      this.filter_remark = this.type_remark +this.language_remark + this.sort_remark
    },
    repo_language_filter: {
      deep: true,
      handler(val) {
        this.getRepos();
        this.filter_remark = ""

        if(val !== ""){
        this.language_remark = val !== '' ? "written in "+val : '';
         this.filter_remark = this.type_remark +this.language_remark + this.sort_remark
        }
      },
    },
    repo_type(val) {
      this.getRepos();
      this.type_remark = val == '' ? '' : val == 'is:public' ? '<b>public</b>' : val == 'is:private' ? '<b>private</b>' : val == 'fork:true' ? '<b>forked</b>' : val == 'archived:true' ? '<b>archived</b>' : val == 'mirror:true' ? '<b>mirrored</b>' : val == 'is:source' ? '<b>source</b>' : '';
       this.type_mark = 'results for '+this.type_remark;

       this.filter_remark = this.type_remark +this.language_remark + this.sort_remark

       console.log(JSON.stringify(this.repositories, null, 2));
    },
  },
};
</script>

<style scoped>
#more-sec-one {
  height: auto;
  width: 100%;
  margin: 0px;
  display: flex;
  padding: 20px 0px;
}

#find-repo-input {
  background-color: transparent;
  outline-style: none;
  height: 30px;
  border-radius: 25px;
  padding: 3px 10px;
  border: 0.5px solid #393c41;

  color: #fff;
  flex: 1;
}

.repo_topics {
  color: #1180e7;
  background-color: #2774bd3b;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
}

#sub-sec {
  display: block;
}

#find-repo-input:hover {
  border: 0.5px solid #b1b1b1;
}

.sub-btn {
  color: #c9d1d9;
  background-color: #393c41;
  border: none;
  padding: 12px 25px;
  font-size: 12px;
  outline-style: none;
  margin: 0px 0px 0px 10px;
  border-radius: 25px;
}

.sub-btn:hover {
  padding: 12px 23px;
  border: 0.5px solid #c9d1d9;
  cursor: pointer;
}

#create-repo-btn {
  background-color: #238636;
  color: #fff;
  border: none;
  padding: 7px 10px;
  font-size: 12px;
  outline-style: none;
  margin: 0px 0px 0px 10px;
  border-radius: 20px;
}

#create-repo-btn:hover {
  background-color: #23cc45;
  cursor: pointer;
}

@media only screen and (max-device-width: 767px) {
  #more-sec-one {
    height: auto;
    width: 100%;
    margin: 0px;
    display: flex;
    flex-direction: column;
    padding: 10px 0px 0px 0px;
  }

  #find-repo-input {
    flex: unset;
    width: 95%;
    margin: auto;
  }

  #sub-sec {
    text-align: center;
    width: 100%;
  }

  .sub-btn {
    margin: 10px auto 10px auto;
  }
}

@media only screen and (min-device-width: 768px) {
  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-wrapper {
    display: none;
    position: absolute;
    background-color: #393c41;
    min-width: 280px;
   
    margin: 5px 0px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
    z-index: 1;
    border-radius: 5px;
    right: 0;
  }

  .dropdown-title {
    color: #c9d1d9;
    padding: 10px;
    font-size: 12px;
    display: block;
    border-bottom: 0.1px solid #5a5a5a;
  }

  /* Show the dropdown menu (use JS to add this class to the .dropdown-wrapper container when the user clicks on the dropdown button) */
  .show {
    display: block;
  }

  #dropdown-content {
    margin: 0px 0px;
    padding: 0px;
    list-style-type: none;
     max-height: 400px;
    overflow: auto;
  }

  #dropdown-content li {
    padding: 11px 12px;
    color: #c9d1d9;
    font-size: 13px;
    cursor: pointer;
  }

  .active-dropdown,
  #dropdown-content li:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .repo-cover {
    display: block;
    height: auto;
    width: 100%;
    margin: auto;
    border-style: groove;
    border-color: #b1b1b1;
    border-width: 0.1px 0px 0.1px 0px;
  }
}

@media only screen and (max-device-width: 767px) {
  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: unset;
    display: unset;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-wrapper {
    display: none;
    position: fixed;
    background-color: #393c41;
    min-width: 300px;
    margin: 5px 0px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 100;
    border-radius: 5px;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    text-align: left;
  }

  .dropdown-title {
    color: #c9d1d9;
    padding: 10px;
    font-size: 12px;
    display: block;
    border-bottom: 0.1px solid #b1b1b1;
  }

  /* Show the dropdown menu (use JS to add this class to the .dropdown-wrapper container when the user clicks on the dropdown button) */
  .show {
    display: block;
  }

  #dropdown-content {
    margin: 0px 0px;
    padding: 0px;
    list-style-type: none;
  }

  #dropdown-content li {
    padding: 7px 10px;
    color: #c9d1d9;
    font-size: 13px;
    cursor: pointer;
  }

  #dropdown-content li:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .repo-cover {
    display: block;
    height: auto;
    width: 93%;
    margin: auto;
    border-style: groove;
    border-color: #b1b1b1;
    border-width: 0.1px 0px 0.1px 0px;
  }
}

.inner-rep-cover {
  height: auto;
  width: 100%;
  margin: 25px 0px;
  display: flex;
}

.text-cover {
  flex: 1;
}

.actn-cover {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
}

.repo-name {
  font-weight: bold;

  font-size: 21px;
  display: inline-block;
  padding: 5px 0px 3px 0px;
  cursor: pointer;
}

.repo-name a {
  color: #47a6ff;
  text-decoration: none;
}

.repo-name a:hover {
  text-decoration: underline;
}

.repo-desc {
  color: #b1b1b1;
  display: inline-block;
  font-size: 14px;
  padding: 5px 0px 3px 0px;
}

.repo-datex {
  color: #b1b1b1;
  display: block;
  padding: 12px 0px;
  font-size: 14px;
  white-space: nowrap;
}

.repo-datex span {
  display: inline-block;

  margin: 0px 5px;
  text-align: left;
}

.star-repo-btn {
  color: #c9d1d9;
  background-color: #393c41;
  border: none;
  padding: 7px 15px;
  font-size: 15px;
  outline-style: none;
  margin: 0px 0px 0px 10px;
  border-radius: 20px;
}

.star-repo-btn:hover {
  border: 0.5px solid #c9d1d9;
  padding: 6.5px 14.5px;
  cursor: pointer;
}

#error-wrapper {
  width: 100%;
  padding: 30px 0px;
  text-align: center;
  color: cornflowerblue;
  cursor: pointer;
  margin-top: 200px;
}

* {
  text-align: left;
}
</style>