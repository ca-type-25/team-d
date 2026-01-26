
const Activity = require('../models/activityModel')

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find().populate('destinationIds')
        res.send(activities)

    } catch (error) {
        res.status(500).send(error)
    }
}

const getActivityId = async (req, res) => {
    try {
      const { id } = req.params

      const activity = await Activity.findById(id).populate('destinationIds')
  
      if (!activity) {
        return res.status(404).send({ error: 'Activity not found' })
      }
  
      res.send(activity)
    } catch (error) {
      res.status(500).send(error)
    }
}
 
const getActivitiesByDestination = async (req, res) => {
    try {
        const {destinationId} = req.params
        const activities = await Activity.find({ destinationIds: destinationId }).populate('destinationIds')
        res.send(activities)
    } catch (error) {
        res.status(500).send(error)
    }
    };

const getActivitiesByPrice = async (req, res) => {
  try {
    const { price } = req.query;
    const parsedPrice = Number(price);

    if (isNaN(parsedPrice)) {
      return res.status(400).send({ message: "Invalid price format" });
    }

    const activities = await Activity.find({ price: { $lte: parsedPrice } }).populate('destinationIds');
    res.send(activities);
  } catch (error) {
    console.error(error); 
    res.status(500).send(error);
  }
};

const createActivity = async (req, res) => {
try {
    const activity = new Activity(req.body)
    await activity.save()

    res.send(activity)
} catch (error) {
    res.status(500).send(error)
}
}
  
const updateActivity = async (req, res) => {
try {
    const { id } = req.params
    const updatedActivity = await Activity.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true } 
    )

    if (!updatedActivity) {
    return res.status(404).send({ error: 'Activity not found' })
    }

    res.send(updatedActivity)
} catch (error) {
    if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
    }
    res.status(500).send(error)
}
}
  
const removeActivity = async (req, res) => {
try {
    const { id } = req.params
    const deletedActivity = await Activity.findByIdAndDelete(id)

    if (!deletedActivity) {
    return res.status(404).send({ error: 'Activity not found' })
    }

    res.send(deletedActivity)
} catch (error) {
    res.status(500).send(error)
}
}

module.exports = {
    getActivities,
    getActivityId,
    getActivitiesByDestination,
    getActivitiesByPrice,
    createActivity,
    updateActivity,
    removeActivity
}