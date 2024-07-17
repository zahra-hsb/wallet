import './globals.css'


import { headers } from 'next/headers'


import { config } from '@/config'
import Web3ModalProvider from '@/context'
import { cookieToInitialState } from 'wagmi'
import { TrackIdProvider } from '@/context/trackIdContext'

export const metadata = {
  title: 'Ai Market',
  description: ''
}


export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en">
      <body>

        <Web3ModalProvider initialState={initialState}>
          <TrackIdProvider>
            {children}
          </TrackIdProvider>
        </Web3ModalProvider>

      </body>
    </html>
  )
}