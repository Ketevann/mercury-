import Goals from '../components/goals';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    goals: state.goals.list
  };
};

const GoalsContainer = connect(
  mapStateToProps
)(Goals);

export default GoalsContainer;