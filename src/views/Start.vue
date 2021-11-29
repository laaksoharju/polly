<template>
  <header class="format">
    <div>
      <h1>MapQuiz</h1>
      <p>Welcome get your brain warmed up bishes</p>
      <button id="LangButton" style  v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>

  </header>

  <div id="nav">
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <label>
      Write poll id: 
      <input type="text" v-model="id">
    </label>
    <button>
    <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
    </button>
  </div>


</template>

<script>
import io from 'socket.io-client';
const socket = io();

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
#LangButton{
  
}

</style>
