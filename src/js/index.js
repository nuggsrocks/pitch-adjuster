import 'regenerator-runtime/runtime'

import { loadFile } from './loadFile'
import { loadSound } from './loadSound'
import { playSound } from './playSound'
import { cutGrains } from './cutGrains'

const audioCtx = new AudioContext()

const fileInput = document.querySelector('#file-input')

let grains

let playbackRate = 1

const playButton = document.querySelector('#play-button')

playButton.onclick = () => playSound(audioCtx, grains, playbackRate)

fileInput.oninput = (event) => {
  const audioFile = event.target.files[0]

  loadFile(fetch, URL.createObjectURL(audioFile)).then(arrayBuffer => {
    loadSound(audioCtx, arrayBuffer).then(audioBuffer => {
      grains = cutGrains(audioCtx, audioBuffer)
      playButton.disabled = false
    })
  })
}

const pitchInputRange = document.querySelector('#pitch-input-range')
const pitchInputNumber = document.querySelector('#pitch-input-number')

pitchInputRange.oninput = (event) => {
  pitchInputNumber.value = event.target.value
  playbackRate = Math.pow(2, event.target.value / 12)
}

pitchInputNumber.oninput = (event) => {
  pitchInputRange.value = event.target.value
  playbackRate = Math.pow(2, event.target.value / 12)
}
