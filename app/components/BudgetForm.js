import React from 'react'
import {budgetCreate} from '../reducers/budget'
import {connect} from 'react-redux'



class BudgetForm extends React.Component  {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt){
    evt.preventDefault()

    const newBudget = {
      food: evt.target.food.value,
      bills: evt.target.bills.value,
      healthcare: evt.target.healthcare.value,
      emergencies: evt.target.emergency.value,
      transportation: evt.target.transporation.value,
      education: evt.target.education.value,
      entertainment: evt.target.ent.value,
      other: evt.target.other.value

    }
    this.props.budgetCreate(newBudget)
    evt.target.food.value = ''
    evt.target.bills.value = ''
    evt.target.healthcare.value = ''
    evt.target.emergency.value = ''
    evt.target.transporation.value = ''
    evt.target.education.value = ''
    evt.target.ent.value = ''
    evt.target.other.value = ''
  }


  render() {
    return (<div className="budgetform">
      <form  onSubmit={(evt) => this.handleSubmit(evt)}>
        <div className="form-group row">
          <label htmlFor="example-text-input" className="col-2 col-form-label">Bills</label>
          <div className="col-10">
            <input className="form-control" required name="bills" type="number"  step="0.01" id="example-text-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-search-input"  className="col-2 col-form-label">Education</label>
          <div className="col-10">
            <input className="form-control" required name="education" type="number"  step="0.01" id="example-search-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-email-input" className="col-2 col-form-label">Emergency</label>
          <div className="col-10">
            <input className="form-control" required name="emergency" type="number" step="0.01" id="example-email-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-tel-input" className="col-2 col-form-label">Food</label>
          <div className="col-10">
            <input className="form-control" required name="food" type="number" step="0.01" id="example-tel-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-tel-input" className="col-2 col-form-label">Healthcare</label>
          <div className="col-10">
            <input className="form-control" required name="healthcare" type="number" step="0.01" id="example-tel-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-tel-input" className="col-2 col-form-label">Entertainment</label>
          <div className="col-10">
            <input className="form-control" required name="ent" type="number" step="0.01" id="example-tel-input" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Transportation</label>
          <div className="col-10">
            <input className="form-control" required name="transporation" type="number" step="0.01" id="example-month-input" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Other</label>
          <div className="col-10">
            <input className="form-control" required name="other" type="number" step="0.01" id="example-week-input" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
       </form>
      </div>
    )
  }
}



export default connect({}, {budgetCreate},)(BudgetForm)
