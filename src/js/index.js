import '../scss/index.scss'
import 'regenerator-runtime/runtime'
import { loadFile } from './loadFile'
import { loadSound } from './loadSound'

const fileInput = document.querySelector('input')

const audioCtx = new AudioContext()

let decodedSound

fileInput.oninput = (event) => {
  const audioFile = event.target.files[0]

  loadFile(fetch, URL.createObjectURL(audioFile)).then(arrayBuffer => {
    loadSound(audioCtx, arrayBuffer).then(audioBuffer => {
      decodedSound = audioBuffer
    })
  })
}
