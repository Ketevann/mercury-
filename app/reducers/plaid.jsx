import axios from 'axios'
import { browserHistory } from 'react-router'

const initialPlaidState = {
	currentUser: {},
	accessToken: ''
}

// --------------------------- actions ----------------------
const GETACCESSTOKEN = 'GET_ACCESSTOKEN'

// action creator
export const getAccessToken = accessToken => ({
	type: GETACCESSTOKEN, accessToken
})

// ---------------------- dispatchers ----------------------
export const fetchAccessToken = () =>
	dispatch =>
		axios.get('/api/get_access_token')
			.then(res => dispatch(getAccessToken(res.data)))
			.catch(err => console.error('Fetching access token unsuccessful', err))

// ---------------------- reducers ----------------------
const reducer = (state = initialPlaidState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type) {
		case GETACCESSTOKEN:
			return Object.assign({}, state, { accessToken: action.accessToken })
		default:
			return state
	}
}
