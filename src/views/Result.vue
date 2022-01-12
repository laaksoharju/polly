<template>
  <section id="window">
    <section id="header">
      <leftHeader>
        <h4>P-o-l-l-yyyyyyyyyyy!</h4>
      </leftHeader>

      <midHeader>
        <h4>Result of poll {{pollId}} </h4>
      </midHeader>

      <rightHeader>
        <button v-on:click="switchLanguage">
          {{ uiLabels.changeLanguage }}
        </button>
      </rightHeader>
    </section>
    <section id="page">

      <nav>
        <div>Question:</div>

        <br/>
        <div>{{ question }}</div>

      </nav>
      <br>
      <main>
        <div>

<!--          <br>-->
<!--          <div>-->
<!--            {{pollId}}-->
<!--            <button v-on:click="showResults" class="answerButton">-->
<!--              Show results-->
<!--            </button>-->
<!--          </div>-->

          <Bars v-bind:data="data"/>

        </div>

      </main>

      <option id="pollBottom">

        <button v-on:click="prevQuestion" class="answerButton">
          {{uiLabels.previousQ}}
        </button>
        <div>
<!--          Maybe show some comments here-->
        </div>
        <button v-on:click="nextQuestion" class="answerButton">
          {{uiLabels.nextQ}}
        </button>

      </option>

    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
import '../assets/css/main.css';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars
  },
  data: function () {
    return {
      question: "",
      data: {
      },
      resultQ: "",
      uiLabels: {}
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
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
    showResults: function() {
      socket.emit("showResults", {pollId: this.pollId});
      socket.on("sendPoll", function(d) {
        let ans = d.answers;
        let q = d.questions;
        let i = 0;
        q.forEach(element => {
          //Instead of logging to console we should display these
          console.log(element.q);
          console.log(element.a);
          console.log(ans[i]);
          console.log(element.isCorrect);
          i++;
        });
      })
    },
    nextQuestion: function(){
      socket.emit("getNextQ", {pollId: this.pollId});
      //console.log("clicked next butt");
      socket.on("sendPoll", function(d) {
        let ans = d.answers;
        let q = d.questions;
        let i = 0;
        q.forEach(element => {
          //Instead of logging to console we should display these
          console.log(element.q);
          console.log(element.a);
          console.log(ans[i]);
          console.log(element.isCorrect);
          i++;
        });
      })
    },
    prevQuestion: function(){
      socket.emit("getPrevQ", {pollId: this.pollId});
      //Resets "next question" button if it has previously been changed to say "View Results"
      //document.getElementById("nextQuestionButton").innerHTML = 'Next Question';
      //document.getElementById("nextQuestionButton").onclick = 'nextQuestion';
      //console.log("clicked prev butt");
      socket.on("sendPoll", function(d) {
        let ans = d.answers;
        let q = d.questions;
        let i = 0;
        q.forEach(element => {
          //Instead of logging to console we should display these
          console.log(element.q);
          console.log(element.a);
          console.log(ans[i]);
          console.log(element.isCorrect);
          i++;
        });
      })
    },
    showComments: function() {
      socket.emit("showComments", {comments: this.comments, questionNumber: this.questionNumber })
    }
  },
  mounted: function(){
    this.$nextTick(this.showResults);
  }
}
</script>
