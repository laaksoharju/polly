<template>
  <main class="theme">
  <header class="format">
    <div class="container"><br>
      <h1 id="headertext">MapQuiz</h1>
      <p>Welcome get your brain warmed up bishes</p>
      <button id="LangButton" style v-on:click="switchLanguage">{{ uiLabels.changeLanguage }}</button>
    </div>
  </header>


  <section >
    <div id="nav">
      <button>
        <router-link v-bind:to="'/poll/'+id" tag="button">{{ uiLabels.participatePoll }}</router-link>
      </button>

      <button>
        <router-link v-bind:to="'/create/'+lang">{{ uiLabels.createPoll }}</router-link>
      </button>
    </div>
    <label>
      Write poll id:
      <input type="text" v-model="id">
    </label>
  </section>


  <footer class="buttom">
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
.format{
  background-color: rgb(18, 50, 255);
  color: white;
}
.buttom{
  margin-top: 500px;
}
.container{
}
#LangButton{
  margintop: 10 px;
  marginright: 10 px;
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
#headertext{
  font-size: 300%;

}

</style>
