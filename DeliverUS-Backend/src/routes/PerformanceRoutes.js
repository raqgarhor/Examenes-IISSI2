// SOLUCION

import * as PerformanceValidation from '../controllers/validation/PerformanceValidation.js'
import PerformanceController from '../controllers/PerformanceController.js'
// This is a new file for solution!
import { hasRole, isLoggedIn } from '../middlewares/AuthMiddleware.js'
import * as PerformanceMiddleware from '../middlewares/PerformanceMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'

const loadFileRoutes = (app) => {
  app.route('/performances')
    .post(
      isLoggedIn, //  Should return 401 if not logged in
      hasRole('owner'), // Should return 403 when logged in as a customer
      PerformanceValidation.create,
      handleValidation,
      PerformanceMiddleware.checkPerformanceRestaurantOwnership,
      PerformanceController.create
    )
}

export default loadFileRoutes
