let timerId = null

onmessage = (event) => {
  if (event.data === 'start') {
    timerId = setInterval(() => postMessage('hey'), 25)
  } else if (event.data === 'stop') {
    clearInterval(timerId)
  }
}
