import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useApollo } from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'
import Layout from '../components/Layout'
import SearchCtxProvider from '../context/SearchCtxProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <SearchCtxProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchCtxProvider>
    </ApolloProvider>
  )
}

export default MyApp
