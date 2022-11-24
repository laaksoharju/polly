<template>
  <body>
  <div>
    <div>
      <h3>Choose a saved game or edit one</h3>
      <ul>
        <li>
          Game name..
          <router-link v-bind:to="'/hostpregame'"><button>Start</button></router-link>
          <router-link v-bind:to="'/create/'+id"><button>Edit</button></router-link>
        </li>
      </ul>
    </div>
  </div>
  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">Back</button>
    </div>
  </footer>
  </body>
</template>

<script>
export default {
  name: "SelectSavedGame"
}
</script>

<style scoped>

</style>