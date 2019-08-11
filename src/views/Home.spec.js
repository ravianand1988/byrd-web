import Home from '@/views/Home'

describe('@views/Home.vue', () => {
  it('is a valid Vue component', () => {
    expect(Home).toBeAComponent()
  })

  it('mounts without errors', () => {
    mountHome()
  })
})

function mountHome () {
  return shallowMount(Home, mountingOptions({
    router: true
  }))
}
