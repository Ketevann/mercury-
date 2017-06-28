import React from 'react'

const BudgetForm = () => {
  return ( <div>
  <form>
        <div className="form-group row">
          <label htmlFor="example-text-input" className="col-2 col-form-label">Income</label>
          <div className="col-10">
            <input className="form-control" type="text"  id="example-text-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-search-input" className="col-2 col-form-label">Home</label>
          <div className="col-10">
            <input className="form-control" type="search" id="example-search-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-email-input" className="col-2 col-form-label">Utilities</label>
          <div className="col-10">
            <input className="form-control" type="email" id="example-email-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-url-input" className="col-2 col-form-label">Food</label>
          <div className="col-10">
            <input className="form-control" type="url"id="example-url-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-tel-input" className="col-2 col-form-label">Car</label>
          <div className="col-10">
            <input className="form-control" type="tel" id="example-tel-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-tel-input" className="col-2 col-form-label">Family</label>
          <div className="col-10">
            <input className="form-control" type="tel" id="example-tel-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-tel-input" className="col-2 col-form-label">Health</label>
          <div className="col-10">
            <input className="form-control" type="tel" id="example-tel-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-tel-input" className="col-2 col-form-label">Ent</label>
          <div className="col-10">
            <input className="form-control" type="tel" id="example-tel-input" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="example-tel-input" className="col-2 col-form-label">Misc</label>
          <div className="col-10">
            <input className="form-control" type="tel" id="example-tel-input" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Month</label>
          <div className="col-10">
            <input className="form-control" type="month" id="example-month-input" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Week</label>
          <div className="col-10">
            <input className="form-control" type="week" id="example-week-input" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="example-color-input" className="col-2 col-form-label">Color</label>
          <div className="col-10">
            <input className="form-control" type="color" id="example-color-input" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
</form>
      </div>
    )
  }







export default BudgetForm
