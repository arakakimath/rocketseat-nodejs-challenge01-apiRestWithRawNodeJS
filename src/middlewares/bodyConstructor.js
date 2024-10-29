export async function bodyConstructor (req, res) {
  const buffers = [] //initial array that will catch all chunks from the req stream

  for await (const chunk of req)
    buffers.push(chunk)

  try{
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }
  
  res.setHeader('Content-type', 'application/json')
}