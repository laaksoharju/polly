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

    <section id="page">

      <nav>
        Question
        <br />
        Number
        <br />
        <input class="singleInput"
               type="number"
               v-model="questionNumber">
        <button v-on:click="addQuestion">
          Add question
        </button>
      </nav>

      <main>
        <div>
          {{uiLabels.question}}:
          <input class="singleInput" type="text" v-model="question">
          <div>
            Answers:
            <input class="singleInput"
                   v-for="(_, i) in answers"
                   v-model="answers[i]"
                   v-bind:key="'answer'+i">
            <button v-on:click="addAnswer">
              Add answer alternative
            </button>
          </div>
        </div>

        <button v-on:click="runQuestion">
          Run question
        </button>
      </main>

      <option>
        {{data}}
        <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
      </option>

    </section>

  </section>

</template>

<script>
import io from 'socket.io-client';
import '../assets/css/main.css';
const socket = io();

export default {
  name: 'Create',
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
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>


<style>
  /*
    see file '../assets/css/main.css';
  */
</style>