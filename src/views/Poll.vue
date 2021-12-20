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
        Poll id:
        <br>
        <div>
          {{pollId}}
          <Question v-bind:question="question"
                    v-on:answer="submitAnswer"/>
        </div>


      </div>

    </main>

    <div id="pollBottom">

      <button v-on:click="prevQuestion" class="answerButton">
        {{uiLabels.previousQ}}
      </button>
      <div>
        This is where the chatfunction goes
      </div>
      <button v-on:click="nextQuestion" class="answerButton" id="nextQuestionButton">
        {{uiLabels.nextQ}}
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
    socket.on("redirectResults", () => {
      //When all questons have been answered, changes the "next question"-button to a "view results"-button redirecting to results page
      var url = "../#/result/" + this.pollId;
      var redirectUrl = 'location.href = "' + url + '";';
      document.getElementById("nextQuestionButton").innerHTML = 'View Results';
      document.getElementById("nextQuestionButton").onclick = function(){
        location.href = url;
      }
      console.log(url);
      console.log(redirectUrl);
    })
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer});
    },
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    nextQuestion: function(){
      socket.emit("getNextQ", {pollId: this.pollId});
    },
    prevQuestion: function(){
      socket.emit("getPrevQ", {pollId: this.pollId});
      //Resets "next question" button if it has previously been changed to say "View Results"
      document.getElementById("nextQuestionButton").innerHTML = 'Next Question';
      document.getElementById("nextQuestionButton").onclick = 'nextQuestion';
    }
  }
}
</script>

<style>
  /*
    see file '../assets/css/main.css';
  */

</style>
