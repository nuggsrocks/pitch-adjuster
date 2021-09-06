import 'regenerator-runtime/runtime'

import { loadFile } from './loadFile'
import { loadSound } from './loadSound'
import { playSound } from './playSound'
import { cutGrains } from './cutGrains'

const audioCtx = new AudioContext()

const fileInput = document.querySelector('#file-input')

let grains

const playbackRate = 1.1

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
