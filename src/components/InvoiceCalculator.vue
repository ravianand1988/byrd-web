<template>
 <v-container>
   <v-layout v-if="orders.length">
     {{this.orders}}
   </v-layout>
 </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'InvoiceCalculator',
  computed: {
    ...mapState('order', ['orders'])
  }
}
</script>

<style scoped>

</style>
