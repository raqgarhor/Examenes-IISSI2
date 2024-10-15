// This is a new file for solution!
import { Restaurant } from '../models/models.js'

// Should return 403 when logged in as another owner
const checkPerformanceRestaurantOwnership = async (req, res, next) => {
  // TO-DO: middleware for performance
  try {
    const restaurant = await Restaurant.findByPk(req.body.restaurantId)
    if (req.user.id === restaurant.userId) {
      return next()
    } else {
      return res.status(403).send('Not enough privileges. This entity does not belong to you')
    }
  } catch (err) {
    return res.status(500).send(err)
  }
}

export { checkPerformanceRestaurantOwnership }
