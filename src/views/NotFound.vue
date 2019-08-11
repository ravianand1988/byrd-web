<template>
  <v-container class="text-sm-center">
    <h1>Oops!</h1>
    <h3>The page you're looking for is not here.</h3>
    <router-link :to="{name: 'home'}">Back to the home page</router-link>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>

</style>
