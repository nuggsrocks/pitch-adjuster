import '../scss/index.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const sayHello = () => {
  document.body.append('Hello world')
}

export default { sayHello }
