<template>
  <div>
    <app-header />

    <tabmenu />
  </div>
</template>

<script>
import appHeader from "../components/header.vue";
import tabmenu from "../components/tabmenu.vue";
//   import {REPOSITORIES} from '../queries/github'

export default {
  components: {
    appHeader,
    tabmenu,
  },
  //   apollo: {
  //     search:{
  //       query:REPOSITORIES,
  //             variables () {
  //         return {
  //           options: 'fork:true user:johnleider'
  //         }
  //       }
  //     },

  //   },
  data() {
    return {
      search: [],
    };
  },
};
</script>

<style></style>
