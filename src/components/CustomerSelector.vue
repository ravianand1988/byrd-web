<template>
  <v-card width="" class="mx-auto mt-5">
    <v-card-title>BYRD Customer Invoice generator:</v-card-title>
    <v-form @submit.prevent="submit">
      <v-card-text>
        <v-layout wrap justify-space-around>
          <v-select
            v-model="customerId"
            :items="customerChoices"
            :error-messages="customerErrors"
            prepend-icon="account_circle"
            label="Customer"
            required
            @change="$v.customerId.$touch()"
            @blur="$v.customerId.$touch()"
          ></v-select>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="startDate"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template #activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu1.save(startDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="endDate"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template #activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu2.save(endDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn type="submit"
                 class="info"
                 :disabled="isSubmitDisabled"
          >Generate Invoice
          </v-btn>
        </v-layout>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CustomerSelector',
  components: {},
  data () {
    return {
      menu1: false, // refactor naming
      menu2: false,
      customerId: null,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10)
    }
  },
  validations: {
    customerId: { required }
  },
  computed: {
    ...mapState('customer', ['customers', 'currentCustomer']),
    customerErrors () {
      const errors = []
      if (!this.$v.customerId.$dirty) return errors
      !this.$v.customerId.required && errors.push('Customer is required')
      return errors
    },
    customerChoices () {
      return Object.values(this.customers).map(c => ({ value: c.id, text: c.name }))
    },
    isSubmitDisabled () {
      return this.$v.customerId.$invalid
    }
  },
  methods: {
    ...mapActions('customer', ['fetchCustomers', 'setCurrentCustomer']),
    ...mapActions('order', ['fetchOrders']),
    submit () {
      this.setCurrentCustomer({ customerId: this.customerId, startDate: this.startDate, endDate: this.endDate })
      return this.fetchOrders({
        customerId: this.customerId,
        params: { start_date: this.startDate, end_date: this.endDate }
      })
    },
    mapCurrentCustomer () {
      this.customerId = this.currentCustomer.customerId
      this.startDate = this.currentCustomer.startDate
      this.endDate = this.currentCustomer.endDate
    }
  },
  created () {
    this.fetchCustomers()
    this.mapCurrentCustomer()
  }
}
</script>

<style scoped>

</style>
