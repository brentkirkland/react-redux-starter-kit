// ------------------------------------
// Constants
// ------------------------------------
export const GET_SOIL_MEASURES = 'GET_SOIL_MEASURES'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function getSoilMeasures (value = 1) {
  console.log(value);
  return (dispatch, getState) => {
    setTimeout(() => {
      var data = {
        method: 'GET'
      }
      var url = 'https://us-central1-slurp-165217.cloudfunctions.net/getSoilMeasures' + '?devide_id=' + value + '&limit=120'
      return fetch(url, data)
      .then(res => res.json())
      .then(json => dispatch({
        type    : GET_SOIL_MEASURES,
        payload : json
      }))
    }, 200)
  }
}

export const actions = {
  getSoilMeasures
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SOIL_MEASURES] : (state, action) => {
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
  data: [{temp: '-', humidity: '-', published_at: Date.now()}]
}
export default function deviceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
