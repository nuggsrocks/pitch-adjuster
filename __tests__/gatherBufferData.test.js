import { gatherBufferData } from '../src/js/gatherBufferData'

describe('gatherBufferData()', () => {
  it('should return channel data from given buffer', () => {
    const mockAudioBuffer = {
      numberOfChannels: 2,
      getChannelData: (channel) => Array.from(new Array(1024), () => channel)
    }

    const expected = { 0: mockAudioBuffer.getChannelData(0), 1: mockAudioBuffer.getChannelData(1) }

    expect(gatherBufferData(mockAudioBuffer)).toEqual(expected)
  })
})
