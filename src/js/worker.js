let timerId = null
let interval = 100

onmessage = (event) => {
  if (event.data === 'start') {
    timerId = setInterval(() => postMessage('schedule'), interval)
  } else if (event.data.interval) {
    interval = event.data.interval
  } else if (event.data === 'stop') {
    clearInterval(timerId)
  }
}
