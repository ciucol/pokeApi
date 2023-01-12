const express = require('express')
const { port } = require('./config/app')
const axios = require('axios')

const app = express()

app.get('/pokemons', async (req, res) => {
  const url = 'https://pokeapi.co/api/v2/pokemon/'
  const { data } = await axios.get(url)

  const pokemons = data.results
  res.json({ message: pokemons })
})

app.get('/pokemons/:id', async (req, res) => {
  const { id } = req.params
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const { data } = await axios.get(url)

  const name = data.name
  const image = data.sprites.other['official-artwork'].front_default

  const pokemon = {
    name,
    image
  }

  res.json({ message: pokemon })
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})