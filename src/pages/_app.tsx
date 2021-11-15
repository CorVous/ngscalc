import '../styles/reset.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../../ni18n.config'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default appWithI18Next(MyApp, ni18nConfig)