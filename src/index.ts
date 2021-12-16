import express from "express";

import axios from 'axios'


const app = express()
const port = 3000

app.get('/', (req: any, res: any) => {
  res.send('Hello world')
})

app.get('/some-api', async (req: any, res: any) => {

  const response = await axios('https://partakefoods.com/products/soft-baked-cookie-variety-pack.json')

  res.send(response.data)
})

app.listen(port, () => {
  console.log(`Nock example listening at http://localhost:${port}`)
})
