export function bodyExtractor (req) {
  let title = req.body.title ? req.body.title : ""
  let description = req.body.description ? req.body.description : ""
  
  return {
    title,
    description
  }
}