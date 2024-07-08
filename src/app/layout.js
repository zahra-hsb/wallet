import './globals.css'


import { headers } from 'next/headers'


import { config } from '@/config'
import Web3ModalProvider from '@/context'
import { cookieToInitialState } from 'wagmi'

export const metadata = {
  title: 'Ai Market',
  description: ''
}


export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en">
      <body>

        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>

      </body>
    </html>
  )
}