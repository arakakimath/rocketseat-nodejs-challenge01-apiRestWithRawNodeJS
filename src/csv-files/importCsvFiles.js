import { parse } from "csv-parse"
import fs from 'node:fs'

const tasksPath = new URL('./tasks.csv', import.meta.url)

async function processFile() {
  const records = []
  const parser = fs.createReadStream(tasksPath)
    .pipe(parse({
      delimiter: ',',
      skipEmptyLines: true,
      fromLine: 2
    }))

  for await (const record of parser) {
    const [title, description] = record
    
    fetch('http://localhost:3333/tasks', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  }

}

processFile()