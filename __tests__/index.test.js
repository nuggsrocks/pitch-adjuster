import index from '../src/js/index'

describe('index', () => {
  describe('sayHello()', () => {
    it('should add hello world to the dom', () => {
      index.sayHello()

      expect(document.body.textContent).toMatch(/hello world/i)
    })
  })
})
