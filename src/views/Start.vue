<template>

  <section id="window">
    <section id="header">
      <leftHeader>
      <a href="/"><h4>P-o-l-l-yyyyyyyyyyy!</h4></a>
        <!--
        <router-link
            class="routerLink"
            v-bind:to="'/'">
          P-o-l-l-yyyyyyyyyyy!
        </router-link>
        -->
      </leftHeader>

      <midHeader>
        <router-link
            class="routerLink white"
            v-bind:to="'/create/'+lang">
          {{uiLabels.createPoll_new}}
        </router-link>
      </midHeader>

      <rightHeader>
        <button v-on:click="switchLanguage">
          {{ uiLabels.changeLanguage }}
        </button>
      </rightHeader>
    </section>

    <div class="inputBox">
      <input class="singleInput innerInput"
             type="text"
             v-model="id"
             :placeholder="uiLabels.joinPollLink">
      <router-link
          class="routerLink"
          v-bind:to="'/poll/'+id"
          tag="button">
        {{uiLabels.participatePoll}}
      </router-link>
    </div>
  </section>

</template>

<script>
import io from 'socket.io-client';
import '../assets/css/main.css';
const socket = io();

document.title = "P-o-l-l-y"

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en"
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    }
  }
}
</script>

<style>
  /*
    see file '../assets/css/main.css';
  */
</style>
