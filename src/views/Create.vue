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
            <div v-for="(_, i) in answers" v-bind:key="'answer'+i">
              <!--Adds the checkmark boxes-->
              <button class="check"
                  v-on:click="changeCorrect(i)">
              ☐
              </button>
              <!--Adds the answer inputs-->
              <input id = "answerInput" class="singleInput"
                   v-model="answers[i]">
              <!--Adds the remove answer button-->
              <button id="remove" v-on:click="removeAnswer(i)">
                x
              </button>
            </div>
            <br>
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
    socket.on("questionAdded", (poll) => {
      //hantera hel poll
      console.log(poll);
      this.cleanWindow();
    })
    socket.on("pollCreated", (data) =>
      this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers, isCorrect: this.isCorrect, questionNumber: this.questionNumber } )
    },
    changeCorrect: function(i){
      //the code below adds unique id:s for each checkmark button
      var stringId = "check" + i;
      var checkElements = document.getElementsByClassName("check");
      if (checkElements[i].id !== null){
        checkElements[i].setAttribute("id", stringId);
      }
      //the if-elseif below changes the state of the checkmark button
      if (this.isCorrect[i] == true){
        this.isCorrect[i] = false;
        document.getElementById(stringId).innerHTML = "☐";
        document.getElementById(stringId).style.background = "#cccccc";
      }
      else if(this.isCorrect[i] == false){
        this.isCorrect[i] = true;
        document.getElementById(stringId).innerHTML = "✓";
        document.getElementById(stringId).style.background = "#33cc33";
      }
    },
    //This function does not change the state of the checkboxes, but updates the graphic(for example a question has been removed) if called
    reloadCorrect: function(i){
      //the code below adds unique id:s for each checkmark button, for this redraw function it is only kept as a fallback as it should have been declared in the changeCorrect function
      var stringId = "check" + i;
      var checkElements = document.getElementsByClassName("check");
      if (checkElements[i].id !== null){
        checkElements[i].setAttribute("id", stringId);
      }
      //the if-elseif below redraws the state of the checkmark button
      if (this.isCorrect[i] == true){
        document.getElementById(stringId).innerHTML = "✓";
        document.getElementById(stringId).style.background = "#33cc33";
      }
      else if(this.isCorrect[i] == false){
        document.getElementById(stringId).innerHTML = "☐";
        document.getElementById(stringId).style.background = "#cccccc";
      }
    },
    removeAnswer: function (i) {
      if (this.answers.length > 1){
        this.answers = this.answers.slice(0, i).concat(this.answers.slice(i + 1, this.answers.length));
        this.isCorrect = this.isCorrect.slice(0, i).concat(this.isCorrect.slice(i + 1, this.isCorrect.length));
        for (var k = 0; k < this.isCorrect.length + 1; k++){
          this.reloadCorrect(k);
        }
        console.log(this.isCorrect);
        //adds back original text if it has been replaced by the max number of questions reached-notice
        document.getElementById("answerAdd").innerHTML = "Add answer alternative";
        document.getElementById("answerAdd").style.background = "#03b6ff";
      }
    },
    addAnswer: function () {
      //if we have reached the maximum number of questions (6), we immediately show this
      if (this.answers.length == 5){
        document.getElementById("answerAdd").innerHTML = "Max number of answers reached";
        document.getElementById("answerAdd").style.background = "#cccccc";
        this.answers.push("");
        this.isCorrect.push(false);
      }
      //cannot have more than 6 questions
      else if (this.answers.length < 6){
        this.answers.push("");
        this.isCorrect.push(false);
      }
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber});
    },
    cleanWindow: function (){
      //Cleans the window for inputtiung questions and answers, thus preparing for another entry
      //this.lang = "";
      this.pollId = "";
      this.question = "";
      this.answers = ["", ""];
      this.isCorrect = [false, false];
      this.questionNumber += 1;
      this.data = {};
      //this.uiLabels = {};
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
