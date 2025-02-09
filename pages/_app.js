import "@fontsource/klee-one"; // Fuente normal
import '../styles/globals.css'
import { PortafoliosProvider } from '../context/PortafoliosProvider'


function MyApp({ Component, pageProps }) {

  return (
    <PortafoliosProvider>
      <Component {...pageProps} />
    </PortafoliosProvider>
  )
}

export default MyApp
