import { playSound } from '../src/js/playSound'

describe('playSound(audioCtx, grains)', () => {
  it('should play grains in order seamlessly', () => {
    const mockBufferSource = {
      connect: jest.fn(),
      start: jest.fn()
    }

    const mockAudioCtx = {
      createBufferSource: () => mockBufferSource,
      sampleRate: 44100
    }

    const mockAudioBuffer = Array.from(new Array(512), () => 0)

    const mockGrains = Array.from(new Array(10), () => mockAudioBuffer)

    playSound(mockAudioCtx, mockGrains)

    mockGrains.forEach((grain, index) => {
      expect(mockBufferSource.start).toHaveBeenCalledWith(grain.length * index / mockAudioCtx.sampleRate)
    })
  })
})
