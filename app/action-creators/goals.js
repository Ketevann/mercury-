import { FETCH_GOALS, FETCH_GOAL, ADD_GOAL } from '../constants';
import axios from 'axios';

export const getGoals = (goals) => {
    return {
        type: FETCH_GOALS,
        goals
    }
};

export const getGoal = (goal) => {
    return {
        type: FETCH_GOAL, 
        goal
    }
};


export const addGoal = goal => ({
  type: ADD_GOAL,
  goal
});

export const receiveGoals = () => dispatch => {
    axios.get('/api/goals')
    .then(res => {
        typeof res.data === 'object' 
    })
};

export const receiveGoalById = (goalId) => dispatch => {
    axios.get(`/api/goals/${goalId}`)
    .then(res => {
        dispatch(getGoal(res.data))
    })
};
