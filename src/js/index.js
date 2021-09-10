import 'regenerator-runtime/runtime'
import soundUrl from '../../painkiller1.m4a'

const worker = new Worker('worker.js')

worker.postMessage('start')

worker.onmessage = (event) => {
  console.log(event.data)
}

const AudioContext = window.AudioContext || window.webkitAudioContext

const audioCtx = new AudioContext()

async function processFile (audioCtx, soundUrl) {
  try {
    const res = await fetch(soundUrl)

    const arrayBuffer = await res.arrayBuffer()

    return await audioCtx.decodeAudioData(arrayBuffer)
  } catch (e) {
    console.error(e)
    return null
  }
}

function getAudioData (buffer) {
  const bufferData = []

  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    bufferData.push(buffer.getChannelData(channel))
  }

  return bufferData
}

async function sliceBuffer (bufferData) {
  try {
    const grainSize = 512
    const grains = []

    for (let index = 0; index < bufferData[0].length / grainSize; index++) {
      grains.push([
        bufferData[0].slice(index * grainSize, (index + 1) * grainSize),
        bufferData[1].slice(index * grainSize, (index + 1) * grainSize),
      ])
    }

    return grains
  } catch (e) {
    console.error(e)
  }
}

async function makeBuffers (audioCtx, grains) {
  try {
    const buffers = []

    for (const grain of grains) {
      const buffer = audioCtx.createBuffer(2, grain[0].length, audioCtx.sampleRate)

      for (let channel = 0; channel < 2; channel++) {
        const bufferData = buffer.getChannelData(channel)

        for (let dataIndex = 0; dataIndex < bufferData.length; dataIndex++) {
          bufferData[dataIndex] = grain[channel][dataIndex]
        }
      }

      buffers.push(buffer)
    }

    return buffers
  } catch (e) {
    console.error(e)
  }
}

const playButton = document.querySelector('#play-button')

window.onload = () => {
  playButton.disabled = false
}

playButton.onclick = () => {
  console.log('click')
  const start = performance.now()
  processFile(audioCtx, soundUrl).then(res => {
    const audioData = getAudioData(res)

    sliceBuffer(audioData).then(grains => {
      makeBuffers(audioCtx, grains).then(buffers => {
        console.log(performance.now() - start)
      })
    })
  })
}
