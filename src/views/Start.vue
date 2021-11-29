<template>
  <header class="format">
    <div>
      <h1>MapQuiz</h1>
    </div>
  </header>
  <section>
  <div id="nav">
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <button>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    </button>
    <label>
      Write poll id: 
      <input type="text" v-model="id">
    </label>
    <button>
    <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
    </button>
  </div>
  </section>


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


#nav {
  background-color: rgb(18, 50, 255);
  color: #111010;
  display: grid;
  grid-gap: 250px;
  grid-template-columns: 100px 100px 100px;

  padding: 50px;
}
</style>
