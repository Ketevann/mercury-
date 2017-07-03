import React from 'react'
import { connect } from 'react-redux'

var goalItems = React.createClass({
   render: function() {
    var goalEntries = this.props.entries;
 
    function createGoals(item) {
      return <li key={item.key}>{item.text}</li>
    }
 
    var listItems = goalEntries.map(createGoals);
 
    return (
      <ul className="theList">
        {listItems}
      </ul>
    );
  }
});

export default class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    var itemArray = this.state.items;

    itemArray.push(
      {
        text: this._inputElement.value,
        key: Date.now()
      }
    );

    this.setState({
      items: itemArray
    });

    this._inputElement.value = "";

    e.preventDefault();
    // alert('A goal was added: ' + this.state.value);
    // event.preventDefault();
  }

  render() {
    return (
      <div className="goalsMain">
        <h2>Your Goals</h2>
        <goalItems entries={this.state.items} />
        <div className="header">
          <form onSubmit={this.handleSubmit}>
            <input ref={(a) => this._inputElement = a}
              placeholder="Enter Goal">
            </input>
            <button type="submit">+</button>
          </form>
        </div>
      </div>
    );
  }
}