export function getUrlImage(cid: string) {
  const url = cid.split('ipfs://')
  return `https://ipfs.io/ipfs/${url[1]}`
}

export async function getMetadata(tokenUri: string) {
  let url = tokenUri.replace('ipfs:/', '')
  return fetch(`https://ipfs.io/ipfs${url}`)
    .then((res) => res.json())
    .catch((err) => undefined)
}
