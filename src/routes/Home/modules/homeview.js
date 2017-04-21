// ------------------------------------
// Constants
// ------------------------------------
export const GET_DEVICES = 'GET_DEVICES'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function getDevices (value = 1) {
  return (dispatch, getState) => {
    setTimeout(() => {
      var data = {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      }
      return fetch('https://us-central1-slurp-165217.cloudfunctions.net/getDevices', data)
      .then(res => res.json())
      .then(json => dispatch({
        type    : GET_DEVICES,
        payload : json
      }))
      .catch(function(error) {
        console.log('Request failed', error)
      });
    }, 200)
  }
}

export const actions = {
  getDevices
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DEVICES] : (state, action) => {
    var object = {
      data: action.payload[0]
    }
    state = object
    console.log(state)
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [{device_id: '-', last_temp: '-', last_humidity: '-', last_watered: Date.now(), last_updated: Date.now()}]
}
export default function homeviewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
