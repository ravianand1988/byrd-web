<template>
  <v-container>
    <customer-selector/>
    <invoice-calculator/>
  </v-container>
</template>

<script>
import CustomerSelector from '@/components/CustomerSelector'
import InvoiceCalculator from '@/components/InvoiceCalculator'

export default {
  name: 'Home',
  components: {
    CustomerSelector,
    InvoiceCalculator
  }
}
</script>

<style scoped>

</style>
