import axios from 'axios'
import {whoami} from './auth'
const inistialState = {
  showMenu: false,

}

const SHOWMENU = 'SHOWDROP'
const HIDEMENU = "HIDEDROP"

export const menuShow = (modal) => ({type: SHOWMENU, modal})
export const menuHide = () => ({type: HIDEMENU})



const menuReducer = (menu=inistialState, action) => {
  switch (action.type) {
  case SHOWMENU:

    var bool
    if (menu.showMenu) bool = false
    else bool = true
    return Object.assign({}, menu, {showMenu: bool})

  case HIDEMENU:

    return Object.assign({}, menu, {showMenu: true})


  }

  return menu
}


export default menuReducer
