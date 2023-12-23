import { useMemo } from 'react'
import { ADDRESS_OF_CHAINS } from '../constants'
import { CHAIN_IDS, DEFAULT_CHAIN_ID } from '../constants/chains'
import { AppContractName } from './../constants/common'
import useCurrentChain from './useCurrentChain'

const useAppAddress = (contractName: keyof typeof AppContractName) => {
  const currentChain = useCurrentChain()

  const contractAddress = useMemo(() => {
    if (Object.values(CHAIN_IDS).includes(currentChain.id)) {
      return ADDRESS_OF_CHAINS[currentChain.id][contractName]
    } else {
      return ADDRESS_OF_CHAINS[DEFAULT_CHAIN_ID][contractName]
    }
  }, [currentChain, contractName])

  return contractAddress
}

export default useAppAddress
