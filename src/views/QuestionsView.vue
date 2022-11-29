<template>
    <div>
        <h1>{{uiLabels.createQuestions}}</h1>
      <div>
        {{uiLabels.question}}:
        <input type="text" v-model="question">
        <div>
          Answers:
          <input v-for="(_, i) in answers" 
                 v-model="answers[i]" 
                 v-bind:key="'answer'+i">
          <button v-on:click="addAnswer">
            Add question
          </button>
        </div>
      </div>
      <button v-on:click="addQuestion">
        Add question
      </button>
      <input type="number" v-model="questionNumber">
      <button v-on:click="runQuestion">
        Run question
      </button>
      {{data}}
      <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  const socket = io();
  
  export default {
    name: 'QuestionsView',
    data: function () {
      return {
        lang: "",
        pollId: "",
        question: "",
        answers: ["", ""],
        questionNumber: 0,
        data: {},
        uiLabels: {},
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
      addQuestion: function () {
        socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
      },
      addAnswer: function () {
        this.answers.push("");
      },
      runQuestion: function () {
        socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      },
      //createQuestions: function () {
       // socket.emit("createQuestions", {pollId: this.pollId, question: question})
      //}
    }
  }

  </script>
  