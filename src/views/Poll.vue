<template>
  <section id="window">
  <section id="header">
    <leftHeader>
      P-o-l-l-yyyyyyyyyyy!
    </leftHeader>

    <midHeader>
      Midheadertext
    </midHeader>

    <rightHeader>
      <button v-on:click="switchLanguage">
        {{ uiLabels.changeLanguage }}
      </button>
    </rightHeader>
  </section>
  <div>
    {{pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
  <section id="page">

    <nav>
      {{ uiLabels.question }}
      <br />
      {{ uiLabels.numberSv }}
      <br />

    </nav>
    <br>
    <main>
      <div>
        {{uiLabels.question}}:
        <br>
        This is a placeholder for the questions that will be
        <div>
          {{ uiLabels.answersSv }}
          <div id="pollAnswers">
            <div class="answersLeft" >
              <button v-on:click="addQuestion">
                Placeholder answer
              </button>
            </div>
            <div class="answersRight">
              <button v-on:click="addQuestion">
                 Placeholder answer
              </button>
            </div>

          </div>
          <br>

          <br>

        </div>
      </div>


    </main>

    <div id="pollBottom">

      <button v-on:click="addQuestion" class="answerButton">
        Previous question
      </button>
      <div>
        This is where the chatfunction goes
      </div>
      <button v-on:click="addQuestion" class="answerButton">
        Next question
      </button>

    </div>

  </section>
  </section>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Poll',
  components: {
    Question
  },
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll",
      uiLabels: {}
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },
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
