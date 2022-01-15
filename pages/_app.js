import '../styles/globals.css'
import 'github-markdown-css'
import 'highlight.js/styles/vs.css'
import 'katex/dist/katex.css'
import 'bytemd/dist/index.css'
import store from '../store'
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }) {
  return ( 
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
