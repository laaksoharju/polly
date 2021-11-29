<template>
  <header class="format">
    <div>
      <h1>MapQuiz</h1>
      <p>Welcome get your brain warmed up bishes</p>
      <button id="LangButton" style  v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>

  </header>
<<<<<<< HEAD

  <div id="nav">
=======
  <section>
  <div id="nav">
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <button>
>>>>>>> 8de36eef5b81a0a3b7f14325e077b719f4ac73b8
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
<<<<<<< HEAD

<style>
#LangButton{
  
}

=======
<style>


#nav {
  background-color: rgb(18, 50, 255);
  color: #111010;
  display: grid;
  grid-gap: 250px;
  grid-template-columns: 100px 100px 100px;

  padding: 50px;
}
>>>>>>> 8de36eef5b81a0a3b7f14325e077b719f4ac73b8
</style>
