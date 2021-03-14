<template>
  <div class="tag" :class="(isWin ? 'win' : 'loose')">{{isWin ? "Win" : "Lost"}}</div>
</template>

<script>
export default {
name: "tag",
  props:["isWin"]
}
</script>

<style scoped>
  .tag{
    color: white;
    padding: 3px;
    border-radius: 3px;
    width: 100px;
    font-weight: bold;
  }
  .win{
    background-color: #42b983;
  }
  .loose{
    background-color: #ea3943;
  }
</style>