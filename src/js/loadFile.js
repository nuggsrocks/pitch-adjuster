export const loadFile = (fetch, url) => {
  return fetch(url)
    .then(res => res.arrayBuffer())
    .catch(error => console.error(error))
}
