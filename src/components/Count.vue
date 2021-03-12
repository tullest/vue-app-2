<template>
  <countdown :left-time="300000"> <!-- 101 seconds -->
    <span
      slot="process"
      slot-scope="{ timeObj }">
        {{ timeObj.m }} : {{timeObj.s}}
      </span>
    <span slot="finish">Done !</span>
  </countdown>
</template>

<script>
export default {
name: "count"
}
</script>

<style scoped>

</style>