import 'regenerator-runtime/runtime'
import soundUrl from '../../painkiller1.m4a'
import { processFile } from './processFile'
import { getAudioData } from './getAudioData'
import { sliceBuffer } from './sliceBuffer'
import { makeBuffers } from './makeBuffers'

const AudioContext = window.AudioContext || window.webkitAudioContext

const audioCtx = new AudioContext()

const worker = new Worker('worker.js')

let startTime = null

let slices = null

let playedIndex = 0

const grainSize = 512

const grainDuration = grainSize / audioCtx.sampleRate

worker.onmessage = (event) => {
  if (event.data === 'schedule') {
    schedule()
  }
}

function schedule () {
  while (playedIndex * grainDuration < audioCtx.currentTime + 100) {
    if (playedIndex >= slices.length) {
      worker.postMessage('stop')
      return
    }

    const source = audioCtx.createBufferSource()
    source.buffer = slices[playedIndex]

    source.connect(audioCtx.destination)

    source.start(startTime + playedIndex * grainDuration)
    source.stop(startTime + (playedIndex + 1) * grainDuration)
    playedIndex++
  }
}

const playButton = document.querySelector('#play-button')

playButton.onclick = () => {
  worker.postMessage('start')
  startTime = audioCtx.currentTime
}

processFile(audioCtx, soundUrl).then(res => {
  const audioData = getAudioData(res)

  sliceBuffer(audioData).then(grains => {
    makeBuffers(audioCtx, grains).then(buffers => {
      slices = buffers
      playButton.disabled = false
    })
  })
})
