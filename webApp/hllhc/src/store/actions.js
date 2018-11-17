/**
 * public actions here
 */
import loginActions from './actions/loginActions.js'
import adminActions from './actions/adminActions.js'
let actions = {
  ...loginActions,
  ...adminActions
}

export default actions
