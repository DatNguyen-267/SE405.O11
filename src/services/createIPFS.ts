export async function createMetadata(file: File, title: string, description: string) {
  // try {
  //   if (!STORAGE_API_KEY) {
  //     throw new Error(AppError.API_KEY_INVALID)
  //   }
  //   const client = new NFTStorage({
  //     token: STORAGE_API_KEY as string,
  //   })
  //   const img = new Blob([file])
  //   const data: any = {
  //     image: img,
  //     name: title,
  //     description,
  //   }
  //   const cid = await client.store(data)
  //   return cid
  // } catch (error) {
  //   throw error
  // }
}
