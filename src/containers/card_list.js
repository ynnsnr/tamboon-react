import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTotalDonate, setCharities, showAmounts, fetchFail } from '../actions';
import { summaryDonations } from '../helpers';
import Card from './card';

export class CardList extends Component {
  componentDidMount() {
    const errorMessage = 'Check your internet connection and try again.';
    fetch('http://localhost:3001/charities')
      .then(resp => resp.json())
      .then(data => {
        data.forEach(element => element.modal = false);
        this.props.setCharities(data);
        this.props.showAmounts(Array(data.length).fill(false));
      }).catch(() => {
        this.props.fetchFail(errorMessage);
      });
    fetch('http://localhost:3001/payments')
      .then(resp => resp.json())
      .then(data => {
        const amount = summaryDonations(data.map(item => item.amount));
        this.props.updateTotalDonate(amount);
      }).catch(() => {
        this.props.fetchFail(errorMessage);
      });
  }

  render () {
    return (
      <div className="container-fluid mt-1">
        <div className="row no-gutters">
          {this.props.charities.map((item, index) =>
            <Card key={index} item={item} i={index} />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    charities: state.charities,
    message: state.message,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTotalDonate, setCharities, showAmounts, fetchFail,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
