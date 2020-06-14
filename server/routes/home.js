const {Router} = require('express')
const Home = require('../models/men')
const router = Router()

router.get('/', async (req, res) => {
  const count = parseInt(req.query.count) || 100
  const men = await Home.aggregate([{
    $sample: { size: count }
  }, {
    $group: {
      _id: "$_id",
      document: { $push: "$$ROOT" }
    }
  }, {
    $limit: count
  }, {
    $unwind: "$document"
  }])

  setTimeout(() => {
    res.status(200).json(men.map(({document}) => document))
  }, 500)
})

module.exports = router
