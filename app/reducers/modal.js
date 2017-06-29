import axios from 'axios'

const SHOWMODAL = "SHOWMODAL"

const modalShow = (modal) => ({type: SHOWMODAL, modal})


const inistialState = {
  showModal: false
}
const modalReducer = (modal=inistialState, action) => {
  switch (action.type) {
  case SHOWMODAL:

    return Object.assign({}, modal, {showModal: !action.showModal} )
  }
  console.log(modal, 'modal')
  return modal
}

export default modalReducer
