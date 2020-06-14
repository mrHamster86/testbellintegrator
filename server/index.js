const express = require('express')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

const keys = require('./keys')
const Men = require('./models/men')
const homeRoutes = require('./routes/home')
const getRandomInRange = require('./function/getRandomInRange')

const app = express()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', homeRoutes)

const PORT = process.env.PORT || 1337

async function updateMen() {
  const men = await Men.find()
  const menCount = men.length - 1

  return await Promise.all([...men].map(({id}) => {
    const friends = new Array(getRandomInRange({max: 5})).fill('').map(() => {
      const index = getRandomInRange({max: menCount})
      return men[index]
    })

    return Men.findByIdAndUpdate(id, {friends})
  }))
}

async function initMenName() {
  await fs.readFile(
      path.join(__dirname, 'mock', 'name.json'),
      async (err, content) => {
        if (err) {
          throw err
        }

        const nameList = JSON.parse(content)

        await Promise.all(nameList.map((name) => new Men({name}).save()))
        await updateMen()
      },
  )
}

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    if (await Men.count() === 0) {
      await initMenName()
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  }
  catch (e) {
    console.error(e)
  }
}

start()
