import InvoiceCalculator from '@/components/InvoiceCalculator'

describe('@components/CustomerSelector.vue', () => {
  it('is a valid Vue component', () => {
    expect(InvoiceCalculator).toBeAComponent()
  })

  it('mounts without errors', () => {
    mountInvoiceCalculator()
  })
})

function mountInvoiceCalculator () {
  return shallowMount(InvoiceCalculator, mountingOptions({
    store: {
      order: {
        state: {
          orders: []
        },
        actions: {
          fetchOrders: () => {}
        }
      }
    },
    mocks: {
      $api: {
        endpoints: {
          orders (customerId, params) {
            return Promise.resolve({ data: [] })
          }
        }
      }
    }
  }))
}
