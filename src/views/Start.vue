<template>
  <main class="theme">
<<<<<<< HEAD
    <header>
=======
  <header>
    <div class="container"><br>
      <h1 id="headertext">MapQuiz</h1>
      <p>Welcome!</p>
      <button id="LangButton" style  v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>
  </header>

  <section>
    <div id="nav">
>>>>>>> 63ce546b8551c5b79fce6d88b21218922b26992b
      <div>
        <h1 id="headertext">MapQuiz</h1>
        <p>Welcome! Get your brain warmed up bishes</p>
        <button id="LangButton" style v-on:click="switchLanguage">{{ uiLabels.changeLanguage }}</button>
      </div>
    </header>

<<<<<<< HEAD

    <section>

      <div id="nav">
        <div>
          <div v-if="play">
            <button>
              <router-link v-bind:to="'/poll/'+id" tag="button">{{ uiLabels.participatePoll }}</router-link>
            </button>
            <label>
              Write poll id:
              <input type="text" v-model="id">
            </label>
          </div>
          <div v-else>
            <button id="test1" v-on:click="showPlay">Play</button>
          </div>
        </div>



        <button>
          <router-link v-bind:to="'/create/'+lang">{{ uiLabels.createPoll }}</router-link>
        </button>

      </div>
    </section>


    <footer class="buttom">
      please do not sue us Glöggkrök incorperated
    </footer>
=======
      <button>
        <router-link v-bind:to="'/create/'+lang">{{ uiLabels.createPoll }}</router-link>
      </button>
    </div>

  </section>


  <footer class="buttom">
    please do not sue us Glöggkrök incorperated
  </footer>
>>>>>>> 63ce546b8551c5b79fce6d88b21218922b26992b
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
      lang: "en",
      play: false

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
    },

    showPlay: function () {
     this.play=true

    }
  }
}


</script>

<<<<<<< HEAD

=======
>>>>>>> 63ce546b8551c5b79fce6d88b21218922b26992b
<style>

.theme {
  background-color: rgb(18, 50, 255);
  color: white;
}

#LangButton {
  margintop: 1px;
  marginright: 2px;
}

<<<<<<< HEAD
.format {
=======
.format{
>>>>>>> 63ce546b8551c5b79fce6d88b21218922b26992b
  background-color: rgb(18, 50, 255);
  color: white;
}

.buttom {
  margin-top: 500px;
}

.container {
}
<<<<<<< HEAD

#LangButton {
  margintop: 10px;
  marginright: 10px;

=======
#LangButton{
  margintop: 10 px;
  marginright: 10 px;
>>>>>>> 63ce546b8551c5b79fce6d88b21218922b26992b
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

#headertext {
  font-size: 300%;

}


</style>
