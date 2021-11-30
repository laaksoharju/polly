<template>

  <section id="window">
    <section id="header">
      <div class="inputBox">
        <input class="innerInput"
               type="text"
               v-model="pollId"
               placeholder="Choose your poll link">
        <button v-on:click="createPoll">
          Create poll
        </button>
      </div>
    </section>

    <div id="nav">

      <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
      <label>

        <input class="singleInput" type="text" v-model="id" placeholder="Write poll link to join">
      </label>
      <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
      <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>
  </section>

</template>

<script>
import io from 'socket.io-client';
import '../assets/css/main.css';
const socket = io();

document.title = "POLLS HERE, CREATE YOUR POLL HERE"

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
