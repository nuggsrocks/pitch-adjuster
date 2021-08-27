import { adjustPitch } from '../src/js/adjustPitch'

describe('adjustPitch()', () => {
  it.each([
    { pitchAdjustment: 0, playbackRate: 1 },
    { pitchAdjustment: 1, playbackRate: Math.pow(2, 1 / 12) },
    { pitchAdjustment: -0.01, playbackRate: Math.pow(2, -0.01 / 12) },
    { pitchAdjustment: 23.23, playbackRate: Math.pow(2, 23.23 / 12) }
  ])('should return playback rate that corresponds to given pitch adjustment', ({ pitchAdjustment, playbackRate }) => {
    expect(adjustPitch(pitchAdjustment)).toEqual(playbackRate)
  })
})
