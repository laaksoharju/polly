<template>
  <body>

  <footer>
    <div style="margin: 2em">
      <button style="position:absolute; bottom:100px;" v-on:click="this.$router.go(-1)">Back</button>
    </div>
  </footer>
  </body>

</template>

<script>
export default {
  name: "JoinView"
}
</script>

<style scoped>

</style>