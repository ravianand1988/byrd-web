import NotFound from '@/views/NotFound'

describe('@views/NotFound.vue', () => {
  it('is a valid Vue component', () => {
    expect(NotFound).toBeAComponent()
  })

  it('mounts without errors', () => {
    mountNotFound()
  })
})

function mountNotFound () {
  return shallowMount(NotFound, mountingOptions({
    router: true
  }))
}
