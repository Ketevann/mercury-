import axios from 'axios'
import { FETCH_GOALS, FETCH_GOAL } from '../constants';

const initialState = {goals: []}




const goalReducer = function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case FETCH_GOALS:
      newState.goals = action.goals;
      break;

    case FETCH_GOAL:
      newState.selectedGoal = action.goal;
      break;

    default:
      return state;

  }

  return newState;
};

export default rootReducer