let timerId = null

onmessage = (event) => {
  if (event.data === 'start') {
    timerId = setInterval(() => postMessage('schedule'), 100)
  } else if (event.data === 'stop') {
    clearInterval(timerId)
  }
}
