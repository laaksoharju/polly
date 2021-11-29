<template>
  <main class="theme">
  <header>
    <div>
      <h1>MapQuiz</h1>
      <p>Welcome! Get your brain warmed up bishes</p>
      <button id="LangButton" style  v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>
  </header>


  <section>
    <div id="nav">
      <div>
      <button>
        <router-link v-bind:to="'/poll/'+id" tag="button">{{ uiLabels.participatePoll }}</router-link>
      </button>
        <label>
          Write poll id:
          <input type="text" v-model="id">
        </label>
      </div>

      <button>
        <router-link v-bind:to="'/create/'+lang">{{ uiLabels.createPoll }}</router-link>
      </button>
    </div>
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


<style>

.theme{
  background-color: rgb(18, 50, 255);
  color: white;
}
#LangButton {
  margintop: 1px;
  marginright: 2px;
  position: absolute;
  top: 20px;
  right: 20px;
}
#nav {
  display: grid;
  grid-gap: 300px;
  margin-left: 325px;
  grid-template-columns: 100px 100px 100px;
  padding: 50px;
}
</style>
