<template>
  <body>
  <h2>{{ uiLabels.createYourQuestions }} </h2>
  <div>

    <div class="pageGrid">
      <div class="questionToolWrapper">
        {{uiLabels.question}}:
        <input type="text" v-model="questionObject.questionText">
        <div>
          {{uiLabels.answer}}:
          <!--        <input v-for="(_, i) in answers"-->
          <!--               v-model="answers[i]"-->
          <!--               v-bind:key="'answer'+i">-->
          <!--        <button v-on:click="addAnswer">-->
          <!--          Add answer alternative-->
          <!--        </button>-->

          <input type="radio" id="Yes"
                 v-model="questionObject.questionAnswer" v-bind:value="true">
          <label for="html">{{uiLabels.yes}}</label>

          <input type="radio" id="Nej"
                 v-model="questionObject.questionAnswer" v-bind:value="false">
          <label for="html">{{uiLabels.no}}</label><br>


        </div>

        <button v-on:click="validateForm();addQuestion()">
          {{uiLabels.addYourQuestion}}
        </button>

        <div class = "playButton">
          <router-link v-bind:to="'//'">
            <button>
              {{uiLabels.playGame}}
            </button>
          </router-link>
        </div>

        <div class = "saveButton">

          <router-link v-bind:to="'//'">
            <button>
              {{uiLabels.saveGame}}
            </button>
          </router-link>

        </div>
      </div>

      <div class = "questionListWrapper">
        <h3>{{uiLabels.questionList}}</h3>
        <hr>
        <div class="questionList" v-for="(question,index) in questionArray"
             v-bind:key="question">
          <li>
            <button v-on:click="deleteQuestion(index)">X</button>
            {{"Q: "+question.questionText}}<br>
            {{"A: "+question.questionAnswer}}
          </li>

        </div>
      </div>
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
  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1); goBack();">{{uiLabels.goBack}}</button>
    </div>
  </footer>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'CreateView',
  data: function () {
    return {
      questionArray: [],
      questionObject: {questionText: "", questionAnswer: undefined},
      formValidation: false,

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
      if(this.formValidation===true) {
        const question = Object.assign({}, this.questionObject)
        this.questionArray.push(question)
        console.log(this.questionArray)
        socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers})
      }

      this.questionObject.questionText= "";
      this.questionObject.questionAnswer =  undefined;
      },
    // addAnswer: function () {
    //   this.answers.push("");
    // },
    // runQuestion: function () {
    //   socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    // },

    deleteQuestion: function (index) {
      this.questionArray.splice(index, 1)
    },
    validateForm: function () {
      if (this.questionObject.questionAnswer === undefined ||
          this.questionObject.questionText === "") {
        return this.formValidation=false;
      }
      else {
        return this.formValidation = true;
      }
    },
    goBack: function () {
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels
      })
    }
  }
}
</script>

<style scoped>

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgb(253,52,76);
  background: radial-gradient(circle, rgba(253,52,76,1) 35%, rgba(182,49,65,1) 90%);

}
h2  {
  color: #00C3BA;
  -webkit-text-stroke: 2px black;
  font-size: 5em;

}

.pageGrid{
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  width: 90em;
  height: 90vh;
}

.questionListWrapper {
  background-color: white;
  order: 0;
  width: 20em;
  height: 25em;
  margin-left: 2em;
  margin-right: 2em;
  overflow: auto;

}

.questionToolWrapper{
  width: 60em;
  height: 50em;
  order: 1;
  margin-left: 2em;
  margin-right: 2em;

}

.questionList{
  text-align: left;
  margin-left: 2em;
}
hr {
  height: 10px;
}



</style>
