import '../scss/index.scss'
import 'regenerator-runtime/runtime'
import { loadFile } from './loadFile'
import { loadSound } from './loadSound'
import { playSound } from './playSound'
import { adjustPitch } from './adjustPitch'

const fileInput = document.querySelector('#file-input')

const audioCtx = new AudioContext()

let decodedSound

let playbackRate = 1

const playButton = document.querySelector('#play-button')

playButton.onclick = () => playSound(audioCtx, decodedSound, playbackRate)

fileInput.oninput = (event) => {
  const audioFile = event.target.files[0]

  loadFile(fetch, URL.createObjectURL(audioFile)).then(arrayBuffer => {
    loadSound(audioCtx, arrayBuffer).then(audioBuffer => {
      decodedSound = audioBuffer
      playButton.disabled = false
    })
  })
}

const pitchInputRange = document.querySelector('#pitch-input-range')
const pitchInputNumber = document.querySelector('#pitch-input-number')

pitchInputRange.oninput = (event) => {
  pitchInputNumber.value = event.target.value
  playbackRate = adjustPitch(event.target.value)
}

pitchInputNumber.oninput = (event) => {
  pitchInputRange.value = event.target.value
  playbackRate = adjustPitch(event.target.value)
}
