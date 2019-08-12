<template>
  <v-container v-if="orders.length" px-3 py-5 class="white  elevation-4">
    <v-layout class="mx-5 my-5">
      <v-flex xs4>
        <p>BYRD</p>
        <h1>INVOICE</h1>
      </v-flex>
      <v-flex class="text-sm-right">
        <p>Date Range:</p>
        <p>Total Days:</p>
        <p>Invoice Total:</p>
        <p>Order Quantity:</p>
      </v-flex>
      <v-flex xs2 class="text-sm-right">
        <p class="font-italic">{{currentCustomer.startDate}} to {{currentCustomer.endDate}}</p>
        <p>{{summary.totalDays}}</p>
        <p><strong> &euro; {{summary.totalAmount}} </strong></p>
        <p>{{summary.totalOrders}}</p>
      </v-flex>
    </v-layout>
    <v-simple-table class="my-5">
      <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Email</th>
        <th class="text-left">Total Price</th>
        <th class="text-left">Date</th>
        <th class="text-left">Items</th>
        <th class="text-left">Courier</th>
        <th class="text-left">Service</th>
        <th class="text-left">Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.recipient.name }}</td>
        <td>{{ order.recipient.email }}</td>
        <td> &euro; {{ totalPrice(order.items) }}</td>
        <td>{{ order.created_at }}</td>
        <td>
          <ul>
            <li wrap v-for="item in order.items" :key="item.id">
              {{item.name}} |
              {{item.quantity}} |
              &euro; {{item.total_price.amount}}
            </li>
          </ul>
        </td>
        <td>{{order.delivery.courier}}</td>
        <td>{{order.delivery.method}}</td>
        <td><span> &euro; {{order.charge_customer.total_price}}</span></td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'InvoiceCalculator',
  computed: {
    ...mapState('order', ['orders']),
    ...mapState('customer', ['currentCustomer']),
    summary () {
      return {
        totalDays: this.daysDifference(),
        totalAmount: this.orders.reduce((acc, curr) => acc + parseFloat(curr.charge_customer.total_price), 0),
        totalOrders: this.orders.length
      }
    }
  },
  methods: {
    daysDifference () {
      const dt1 = new Date(this.currentCustomer.startDate)
      const dt2 = new Date(this.currentCustomer.endDate)
      const diff = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())
      return Math.floor(diff) / (1000 * 60 * 60 * 24)
    },
    totalPrice (items) {
      return items.reduce((acc, curr) => acc + parseFloat(curr.total_price.amount), 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
