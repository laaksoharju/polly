<template>
  <body>
    <div>

      Poll link: 
      <input type="text" v-model="pollId">
      <button v-on:click="createPoll">
        Create poll
      </button>
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
    <!--<div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav"> 
    </div>-->
    <div class="text"> 
      Please enter your gamecode
    </div>

    <div >
      <label >
        <input type="text" v-model="id" class="gamecode">
      </label>
        <!--<router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link> -->
    </div>

    <div>
      <button id="next" > Next</button>
     <!-- <router-link id="create" v-bind:to="'/create/'">To Create</router-link>-->
    </div>
 
  <!--<ResponsiveNav v-bind:hideNav="hideNav">
    <button id="language" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <router-link id="poll" v-bind:to="'/poll/'+lang">{{uiLabels.participatePoll}}</router-link>
  </ResponsiveNav> -->

</body>
</template>

<script>
/*import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
    ResponsiveNav
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
}*/
</script>
<style scoped>
  body {
    background-color: rgb(160, 255, 231);
    width: 100%;
    grid-template-columns: 2em auto;
    min-height: 100vh;
  }

  .text {
    margin-top: 100px;
    text-transform: uppercase;
    text-align: center;
    font-size: 3rem;
    color: rgb(0, 0, 0);
    font-family: "Fjord one";
    font-weight: bold;
}

.gamecode{
  margin-top: 150px;
  font-size: 20pt;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  
}
  
#next{
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 30px;
  margin-top: -200px;
  position: absolute;
  left: 70%;
  top:100%;
  transform: translateX(-50%);
  font-family: "Fjord one";
}

#create {
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 30px;
  margin-top: -200px;
  position: absolute;
  left: 40%;
  transform: translateX(-50%);
  font-family: "Fjord one";
}
  /*.logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem; 
  } 
  .hamburger {
    color:rgb(138, 246, 155);
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

  #language {
  background-color: rgb(254, 190, 201);
  font-size: 1.5rem;
  color: black;
  padding: 25px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-family: "Fjord one";
}

#create {
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 30px;
  margin-top: -200px;
  position: absolute;
  left: 40%;
  transform: translateX(-50%);
  font-family: "Fjord one";
}

#join {
  background-color: rgb(90, 58, 64);
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  padding: 30px;
  margin-top: -200px;
  position: absolute;
  left: 60%;
  transform: translateX(-50%);
  font-family: "Fjord one";
}


@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }

}*/
</style>
