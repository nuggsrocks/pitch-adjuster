import { loadSound } from '../src/js/loadSound'

describe('loadSound()', () => {
  it('should return audioBuffer', async () => {
    const mockAudioBuffer = 'audio-buffer'

    const mockAudioCtx = {
      decodeAudioData: jest.fn(() => Promise.resolve(mockAudioBuffer))
    }
    const mockArrayBuffer = new ArrayBuffer(12)

    expect(await loadSound(mockAudioCtx, mockArrayBuffer)).toEqual(mockAudioBuffer)
  })
})
