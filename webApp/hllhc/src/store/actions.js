/**
 * public actions here
 */
import loginActions from './actions/loginActions.js'
import adminActions from './actions/adminActions.js'
import userActions from './actions/userActions.js'
let actions = {
  ...loginActions,
  ...adminActions,
  ...userActions
}

export default actions
