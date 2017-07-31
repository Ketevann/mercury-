import axios from 'axios'
import {whoami} from './auth'
const inistialState = {
  showMenu: false,

}

const SHOWMENU = 'SHOWDROP'
const MENUTRUE = "MENUTRUE"


export const menuShow = (modal) => ({type: SHOWMENU, modal})
export const setMenuToTrue = () => ({type: MENUTRUE})



const menuReducer = (menu=inistialState, action) => {
  switch (action.type) {
  case SHOWMENU:
  var bool
  if (menu.showMenu) bool = false
  else bool = true
    return Object.assign({}, menu, {showMenu: bool})

  case MENUTRUE:

    return Object.assign({}, menu, {showMenu: true})
  }
  return menu
}


export default menuReducer
