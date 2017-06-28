import axios from 'axios'
import { browserHistory } from 'react-router'
const PLAID_PUBLIC_KEY = require('../../credentials.js').PLAID_PUBLIC_KEY

const initialPlaidState = {
	currentUser: {},
	accessToken: ''
}

// --------------------------- actions --------------------------
const GETACCESSTOKEN = 'GET_ACCESSTOKEN'

// ------------------------ action creator ----------------------
export const getAccessToken = accessToken => ({
	type: GETACCESSTOKEN, accessToken
})

// ------------------------- dispatchers ------------------------
export const fetchAccessToken = (public_token) =>
	dispatch => 
		axios.post('/api/get_access_token', {public_token: public_token})
			.then(res => {
				dispatch(getAccessToken(res.data))
			})
			.catch(err => console.error('Fetching access token unsuccessful', err))

export const connectPlaid = ()	=> 
	dispatch => {
		console.log('CONNECT PLAID')
	Plaid.create({
        apiVersion: 'v2',
        clientName: 'Mercury',
        env: 'sandbox',
        product: ['auth'],
        key: PLAID_PUBLIC_KEY,
        onSuccess: (public_token) => {
            console.log('calling this function?', public_token, fetchAccessToken)
            dispatch(fetchAccessToken(public_token))
        },
        onExit: console.log
    }).open()
	}

export const fetchAccounts = (access_token) => 
	dispatch =>
		axios.get('/api/accounts')
			.then(res => {
				console.log(res.data)
			})
			.catch(err => console.error('Fetching accounts unsuccessful', err))


// ------------------------- reducers ---------------------------
const reducer = (state = initialPlaidState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type) {
		case GETACCESSTOKEN:
			return Object.assign({}, state, { accessToken: action.accessToken })
		default:
			return state
	}
}

export default reducer
