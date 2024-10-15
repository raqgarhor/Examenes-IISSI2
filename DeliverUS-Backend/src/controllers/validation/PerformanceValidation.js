// This is a new file for solution!
import { Restaurant, Performance } from '../../models/models.js'
import { check } from 'express-validator'

const checkRestaurantExists = async (value, { req }) => {
  try {
    // Buscar el restaurantId de la peticion post -> estará en el cuerpo de la petición
    const restaurant = Restaurant.finByPk(req.body.restaurantId)
    if (restaurant === null) {
      return Promise.reject(new Error('The restaurantId does not exist.'))
    } else {
      return Promise.resolve('The restaurantId exists.')
    }
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}
/*
const checkOnePerformancePerDay = async (value, { req }) => {
  try {
    let boolean = false
    // Sacar todas las performances de un restaurante
    const performancesOfRestaurants = Performance.findAll({
      where: { restaurantId: req.body.restaurantId }
    })

    // para cada performance vemos que fecha tiene
    for (const p in performancesOfRestaurants) {
      // La fecha del restaurante que vamos a crear
      const newDate = new Date(req.body.appointment)
      // Si la fecha del que queremos crear es igual a una del que ya existe, no dejamos crearlo
      boolean = p.appointment.getTime() === newDate.getTime()
    }
    if (boolean === false) {
      return Promise.reject(new Error('No pueden haber dos actuaciones en el mismo día'))
    } else {
      return Promise.resolve()
    }
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

*/
const checkPerformancesSameDate = async (value, { req }) => {
  try {
    let error = false
    const performances = await Performance.findAll({ where: { restaurantId: req.body.restaurantId } })

    for (const performance of performances) {
      const newPerformanceDate = new Date(req.body.appointment)
      const performanceDateToCompare = performance.appointment
      if (newPerformanceDate.getTime() === performanceDateToCompare.getTime()) {
        error = true
        break
      }
    }

    if (error) {
      return Promise.reject(new Error('No pueden haber dos actuaciones en el mismo día.'))
    } else {
      return Promise.resolve()
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [

  // All performances must have an id
  check('restaurantId').exists().isInt({ min: 1, max: 255 }).toInt(),

  // All performances must have a group (1 ms)
  check('group').exists().isString().isLength({ min: 1, max: 255 }).trim(),

  // All performances must have an appointment
  check('appointment').exists().toDate(),

  // Should return 200 if restaurant exists
  check('restaurantId').custom(checkRestaurantExists),

  // This endpoint should return only one performance in the following six days for tested restaurant (2 ms)
  check('restaurantId').custom(checkPerformancesSameDate)

]

export { create }
