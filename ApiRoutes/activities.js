const express = require('express')
const { getActivities, getActivityId, createActivity, removeActivity, updateActivity, getActivitiesByPrice } = require('../controllers/activityController')

const router = express.Router()

router.get('/filter/price', getActivitiesByPrice);
router.get('/', getActivities)
router.get('/:id', getActivityId)
router.post('/', createActivity)
router.put('/:id', updateActivity)
router.delete('/:id', removeActivity)


module.exports = router