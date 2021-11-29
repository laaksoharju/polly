<template>
  <main class="theme">
  <header>
    <div>
      <h1>MapQuiz</h1>
<<<<<<< HEAD
      <p>Welcome get your brain warmed up bishes</p>
      <button id="LangButton" style v-on:click="switchLanguage">{{ uiLabels.changeLanguage }}</button>
=======
      <p>Welcome! Get your brain warmed up bishes</p>
      <button id="LangButton" style  v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
>>>>>>> 94566151d7bc150dce671709e983d52ff39f5401
    </div>
  </header>

<<<<<<< HEAD


  <section >
    <div id="nav">
      <button>
        <router-link v-bind:to="'/poll/'+id" tag="button">{{ uiLabels.participatePoll }}</router-link>
      </button>

      <button>
        <router-link v-bind:to="'/create/'+lang">{{ uiLabels.createPoll }}</router-link>
      </button>
    </div>
=======
  <section>
  <div id="nav">
    <button>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    </button>
>>>>>>> 94566151d7bc150dce671709e983d52ff39f5401
    <label>
      Write poll id:
      <input type="text" v-model="id">
    </label>
  </section>



  <footer>
    please do not sue us Glöggkrök incorperated
  </footer>
  </main>
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
    switchLanguage: function () {
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
#LangButton {

}
.theme{
  background-color: rgb(18, 50, 255);
  color: white;
}
=======
<style>
#LangButton{
  margintop: 1 px;
  marginright: 2 px;
  position: absolute;
  top: 20px;
  right: 20px;
  
}

>>>>>>> 94566151d7bc150dce671709e983d52ff39f5401

#nav {
  display: grid;
  grid-gap: 300px;
  margin-left: 325px;
  grid-template-columns: 100px 100px 100px;

  padding: 50px;
}
</style>
