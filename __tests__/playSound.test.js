import { playSound } from '../src/js/playSound'

describe('playSound()', () => {
  it('should play given sound in given context', () => {
    const mockBufferSource = {
      connect: jest.fn(),
      start: jest.fn(),
      playbackRate: {
        value: 1
      }
    }

    const mockAudioCtx = {
      createBufferSource: jest.fn(() => mockBufferSource),
      destination: 'destination'
    }

    const mockAudioBuffer = 'audio-buffer'

    const mockPlaybackRate = 0.8

    playSound(mockAudioCtx, mockAudioBuffer, mockPlaybackRate)

    expect(mockAudioCtx.createBufferSource).toHaveBeenCalled()
    expect(mockBufferSource.buffer).toEqual(mockAudioBuffer)
    expect(mockBufferSource.playbackRate.value).toEqual(mockPlaybackRate)
    expect(mockBufferSource.connect).toHaveBeenCalledWith(mockAudioCtx.destination)
    expect(mockBufferSource.start).toHaveBeenCalled()
  })
})
