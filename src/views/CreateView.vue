<template>
  <body>
  <div style="margin: 2em">
    <router-link v-bind:to="'/'"><button>Back</button></router-link>
  </div>
  <header>
    <h2>Create your questions </h2>
  </header>
  <div>

    <div>
      {{uiLabels.question}}:
      <input type="text" v-model="question">
      <div>
        Answer:
<!--        <input v-for="(_, i) in answers"-->
<!--               v-model="answers[i]"-->
<!--               v-bind:key="'answer'+i">-->
<!--        <button v-on:click="addAnswer">-->
<!--          Add answer alternative-->
<!--        </button>-->

        <input type="radio" id="Yes" name="YesNo" value="Yes">
        <label for="html">Yes</label>

        <input type="radio" id="Nej" name="YesNo" value="No">
        <label for="html">No</label><br>


      </div>
    </div>
    <button v-on:click="addQuestion">
      Add question
    </button>

    <div class = "playbutton">
      <router-link v-bind:to="'//'">
      <button>
        Play
      </button>
      </router-link>
    </div>

    <div class = "saveButton">
      <router-link v-bind:to="'//'">
        <button>
          Save
        </button>
      </router-link>
    </div>

    <div class = "questionList">
      <h3>Question list</h3>
      <hr>
    </div>
<!--    <input type="number" v-model="questionNumber">-->

<!--    <button v-on:click="runQuestion">-->
<!--      Run question-->
<!--    </button>-->
<!--    {{data}}-->
<!--    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>-->

<!--    <div class = "link">-->
<!--    Poll link:-->
<!--    <input type="text" v-model="pollId">-->
<!--    <button v-on:click="createPoll">-->
<!--      Create poll-->
<!--    </button>-->
<!--    </div>-->

  </div>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
  },
  methods: {
    // createPoll: function () {
    //   socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    // },
    addQuestion: function () {
      console.log("h")
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers })




    },
    // addAnswer: function () {
    //   this.answers.push("");
    // },
    // runQuestion: function () {
    //   socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    // }
  }
}
</script>

<style scoped>

body {
  width: 100vw;
  height: 100vh;
  background: rgb(253,52,76);
  background: radial-gradient(circle, rgba(253,52,76,1) 35%, rgba(182,49,65,1) 90%);

}
h2  {
  color: #00C3BA;
  -webkit-text-stroke: 2px black;
  font-size: 80px;

 }

.questionList {
  background-color: white;
  width: 300px;
  height: 800px;
}
hr {
  height: 10px;
}



</style>
