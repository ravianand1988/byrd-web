import CustomerSelector from '@/components/CustomerSelector'

describe('@components/CustomerSelector.vue', () => {
  it('is a valid Vue component', () => {
    expect(CustomerSelector).toBeAComponent()
  })

  it('mounts without errors', () => {
    mountCustomerSelector()
  })
})

function mountCustomerSelector () {
  return shallowMount(CustomerSelector, mountingOptions({
    store: {
      customer: {
        state: {
          customers: [],
          currentCustomer: {}
        },
        actions: {
          fetchCustomers: () => {}
        }
      }
    },
    mocks: {
      $api: {
        endpoints: {
          customers () {
            return Promise.resolve({ data: [] })
          }
        }
      }
    },
    methods: {
      submit: () => {},
      mapCurrentCustomer: () => {}
    }
  }))
}
