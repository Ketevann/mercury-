import axios from 'axios'
import {whoami} from './auth'

const inistialState = {
  showModal: false,
}

const SHOWMODAL = 'SHOWMODAL'
const HIDEMODAL = "HIDEMODAL"


/*            Action Creators               */
export const modalShow = (modal) =>  ({type: SHOWMODAL, modal})
export const modalHide = () => ({type: HIDEMODAL})


/*             Reducer               */
const modalReducer = (modal=inistialState, action) => {
  switch (action.type) {
  case SHOWMODAL:

    return Object.assign({}, modal, {showModal: true})

  case HIDEMODAL:

    return Object.assign({}, modal, {showModal: false})
  }
  return modal
}

/*            Dispatcher               */
export const showModal = () =>
  dispatch =>
    dispatch(modalShow())


export const hideModal = () =>
  dispatch =>
    dispatch(modalHide())


export default modalReducer
