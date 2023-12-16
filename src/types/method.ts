export type ContractSendMethod = any
export type ERC20ContractMethods = {
  balanceOf: (ethAddress: string) => ContractSendMethod
  name: () => ContractSendMethod
  decimals: () => ContractSendMethod
  symbol: () => ContractSendMethod
  approve: (spender: string, amount: string) => ContractSendMethod
  transfer: (to: string, amount: string) => ContractSendMethod
  transferFrom: (from: string, to: string, amount: string) => ContractSendMethod
}
export type MarketContractMethods = {}

export type ERC721ContractMethods = {
  balanceOf: (ethAddress: string) => ContractSendMethod
  ownerOf: (tokenId: string) => ContractSendMethod
  safeTransferFrom: (from: string, to: string, tokenId: string, data?: string) => ContractSendMethod
  transferFrom: (from: string, to: string, tokenId: string) => ContractSendMethod
  approve: (approved: string, tokenId: string) => ContractSendMethod
  setApprovalForAll: (operator: string, approved: boolean) => ContractSendMethod
  getApproved: (tokenId: string) => ContractSendMethod
  isApprovedForAll: (owner: string, operator: string) => ContractSendMethod
  supportsInterface: (interfaceId: string) => ContractSendMethod
  tokenOfOwnerByIndex: (owner: string, index: number) => ContractSendMethod
  tokenURI: (tokenId: string) => ContractSendMethod
}

export type ERC1155ContractMethods = {
  balanceOf: (account: string, id: string) => ContractSendMethod
  balanceOfBatch: (accounts: string[], ids: string[]) => ContractSendMethod
  isApprovedForAll: (account: string, operator: string) => ContractSendMethod
  safeBatchTransferFrom: (
    from: string,
    to: string,
    ids: string[],
    amounts: string[],
    data: string | number[],
  ) => ContractSendMethod
  safeTransferFrom: (
    from: string,
    to: string,
    id: string,
    amount: string,
    data: string | number[],
  ) => ContractSendMethod
  setApprovalForAll: (operator: string, approved: boolean) => ContractSendMethod
  supportsInterface: (interfaceId: string | number[]) => ContractSendMethod
  uri: (id: string) => ContractSendMethod
}
