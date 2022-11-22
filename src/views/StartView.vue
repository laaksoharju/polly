<template>
  <body>


  <button class="languageButton" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <div>
      <h1 class="gameName">Namn</h1>
    </div>
    <div>
      <button class="gameButtons">Spela!</button>
<br>
      <button class="gameButtons">Skapa spel</button>

    </div>
<!--  <header>-->
<!--    <div v-bind:class="['hamburger', {'close': !hideNav}]" -->
<!--         v-on:click="toggleNav">-->
<!--    </div>-->
<!--    <div class="logo"><img src="/img/logo.png">Polly polling tool</div>-->
<!--  </header>-->
<!--  <ResponsiveNav v-bind:hideNav="hideNav">-->
<!--    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>-->
<!--    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>-->
<!--    <a href="">Pricing</a>-->
<!--    <a href="">About</a>-->
<!--    <a href="">FAQ</a>-->
<!--  </ResponsiveNav>f-->
<!--  <label>-->
<!--    Write poll id: -->
<!--    <input type="text" v-model="id">-->
<!--  </label>-->
<!--  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>-->
  </body>
</template>

<script>
// import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
    // ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    }
  }
}
</script>
<style scoped>
  header {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }

  body{
    background-color: #FF6357;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Trebuchet MS",serif;
  }

  .gameName{
    margin-top: 20vh;
    font-size: 10vw;
  }

  .gameButtons{
    background-color: #3DFF91;
    width: 20vw;
    height: 10vh;
    margin: 20px;
    font-size: 3vw;
    border-radius: 4vw;
    border-color: #06B250;
    border-style: solid ;
    transition-duration: 0.15s;

  }
  .gameButtons:hover{
    background-color: #06B250;
    border-width: 0.3vw;
    color: #ffffff;

  }
  .languageButton{
    width: 10vw;
    height: 10vh;
  }

  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
  }
  .logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem;
  }
  .hamburger {
    color:white;
    width:1em;
    display: flex;
    align-items: center;
    justify-content: left;
    padding:0.5rem;
    top:0;
    left:0;
    height: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }

/*@media screen and (max-width:50em) {*/
/*  .logo {*/
/*    font-size: 5vw;*/
/*    display: flex;*/
/*    align-items: center;*/
/*    justify-content: center;*/
/*  }*/
/*  .hamburger::before {*/
/*    content: "☰";*/
/*  }*/
/*  .close::before {*/
/*    content: "✕";*/
/*  }*/
/*  .hide {*/
/*    left:-12em;*/
/*  }*/
/*}*/
</style>
