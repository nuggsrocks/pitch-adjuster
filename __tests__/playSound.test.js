import { playSound } from '../src/js/playSound'

describe('playSound()', () => {
  it('should play given sound in given context', () => {
    const mockBufferSource = {
      connect: jest.fn(),
      start: jest.fn()
    }

    const mockAudioCtx = {
      createBufferSource: jest.fn(() => mockBufferSource),
      destination: 'destination'
    }

    const mockAudioBuffer = 'audio-buffer'

    playSound(mockAudioCtx, mockAudioBuffer)

    expect(mockAudioCtx.createBufferSource).toHaveBeenCalled()
    expect(mockBufferSource.buffer).toEqual(mockAudioBuffer)
    expect(mockBufferSource.connect).toHaveBeenCalledWith(mockAudioCtx.destination)
    expect(mockBufferSource.start).toHaveBeenCalled()
  })
})
