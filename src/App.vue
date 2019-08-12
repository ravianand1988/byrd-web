<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <span>BYRD</span>
          <span class="font-weight-light"> Invoice Calculator</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://gist.github.com/evenicoulddoit/769da7c29121e97680a3e1fd174caa1c"
        target="_blank"
      >
        <span class="mr-2">Byrd Front-end task</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
    <notifications group="error" position="bottom right"/>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>
<style scoped lang="scss">
.v-application a {
  text-decoration: none;
  color: gray;
}
</style>
