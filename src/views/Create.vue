<template>

  <section id="window">

    <section id="header">
      <leftHeader>
        P-o-l-l-yyyyyyyyyyy!
      </leftHeader>

      <midHeader>
        <div class="inputBox">
          <input class="innerInput"
                 type="text"
                 v-model="pollId"
                 :placeholder="uiLabels.setPollLink">
          <button v-on:click="createPoll">
            {{ uiLabels.createPoll_save }}
          </button>
        </div>
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
        <input class="singleInput"
               type="number"
               v-model="questionNumber">
        <button v-on:click="addQuestion">
          {{ uiLabels.addQ }}
        </button>
      </nav>
      <br>
      <main>
        <div>
          {{uiLabels.question}}:
          <input id="questionInput" class="singleInput" type="text" v-model="question">
          <div>

          <div class="infoText">
            {{ uiLabels.answersSv }}
          </div>
            <br>
            <input id = "answerInput" class="singleInput"
                   v-for="(_, i) in answers"
                   v-model="answers[i]"
                   v-bind:key="'answer'+i">
            <button id="check"
                  v-for="(_, i) in answers"
                  v-bind:key="'answer'+i"
                  v-on:click="changeCorrect(i)">
              ☐
            </button>
            <br>
            <button id="remove" v-on:click="removeAnswer">
              x
            </button>
            <button id="answerAdd" v-on:click="addAnswer">
              {{ uiLabels.addAalternative }}
            </button>
          </div>
        </div>

        <button v-on:click="runQuestion">
          {{ uiLabels.runQ }}
        </button>
      </main>

      <option>
        {{data}}
        <router-link
            class="routerLink"
            v-bind:to="'/result/'+pollId">
          Check result
        </router-link>
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
      isCorrect: [false, false],
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
    changeCorrect: function(i){
      var stringId = "check" + i;
      console.log(stringId);
      var mainCheck = document.getElementById("check");
      var zeroCheck = document.getElementById("check0");
      var oneCheck = document.getElementById("check1");
      if (mainCheck){
        document.getElementById("check").setAttribute("id", stringId);
      }
      else if (zeroCheck){
        document.getElementById("check0").setAttribute("id", stringId);
      }
      else if (oneCheck){
        document.getElementById("check1").setAttribute("id", stringId);
      }
      else{
        console.log("maincheck null");
      }
      if (this.isCorrect[i] == true){
        console.log("changing " + i + " to false");
        this.isCorrect[i] = false;
        document.getElementById(stringId).innerHTML = "☐";
        document.getElementById(stringId).style.background = "#cccccc";
        console.log("whereerrortrue");
      }
      else if(this.isCorrect[i] == false){
        console.log("changing " + i + " to true");
        this.isCorrect[i] = true;
        document.getElementById(stringId).innerHTML = "✓";
        document.getElementById(stringId).style.background = "#33cc33";
        console.log("whereerrorfalse");

      }
      else{
        console.log("isCorrect typenotseterror")
      }
    },
    removeAnswer: function () {
      if (this.answers.length > 1){
        this.answers.pop();
        this.isCorrect.pop();
        document.getElementById("answerAdd").innerHTML = "Add answer alternative";
        document.getElementById("answerAdd").style.background = "#03b6ff";
      }
    },
    addAnswer: function () {
      if (this.answers.length == 7){
        document.getElementById("answerAdd").innerHTML = "Max number of answers reached";
        document.getElementById("answerAdd").style.background = "#cccccc";
        this.answers.push("");
        this.isCorrect.push(false);
      }
      else if (this.answers.length < 8){
        this.answers.push("");
        this.isCorrect.push(false);
      }
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    },
    //copied from Start.vue:
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
