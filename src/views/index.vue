

<template>
  <div>
    <app-header />

    <h3>{{ search }}</h3>
  </div>
</template>

<script>
import appHeader from "../components/header.vue";
//   import {REPOSITORIES} from '../queries/github'

export default {
  components: {
    appHeader,
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

<style>
</style>