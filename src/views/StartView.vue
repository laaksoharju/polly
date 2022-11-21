<template>
<body>
<link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet'>
  <div>
  <h1 id="title">BuddyCount</h1>
  </div>
  <div id="Buttons">
  <button class="standardButton" role="button">
  <router-link class="noLink" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
  </button>
  <label>
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  <button class="standardButton" role="button">
  <router-link class="noLink" v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
  </button>
  </div>
</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {

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
#Buttons{
  display: grid;
  height: 15em;
  grid-template-columns: 20em;
  justify-content: center;
}
.noLink {
  text-decoration: none;
  color: inherit;
}
body {
  position: fixed;
  background-color: #24A07B;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}

#title{
  font-family: 'Monoton';font-size: 10vw;
}

.standardButton {
  background-color: #70C1B3;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
}



.standardButton:hover {
  background-color: #67b3a5b7;
}


</style>
