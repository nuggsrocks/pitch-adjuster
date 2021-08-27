import { loadFile } from '../src/js/loadFile'

describe('loadFile()', () => {
  it('should return arrayBuffer', async () => {
    const mockFetch = jest.fn(() => Promise.resolve({
      arrayBuffer: jest.fn(() => Promise.resolve(new ArrayBuffer(12)))
    }))

    expect(await loadFile(mockFetch, '/foobar')).toBeInstanceOf(ArrayBuffer)
  })
})
