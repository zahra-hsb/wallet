// import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { defaultWagmiConfig } from '@web3modal/wagmi'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, polygon } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = '1c298743c524cf3db324df9bb0dc848a'

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'crypto',
  description: '',
  url: 'https://aismart.liara.run', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [polygon]
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})