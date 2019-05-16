import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTotalDonate, setCharities, showAmounts, fetchFail, setPayments } from '../actions';
import { summaryDonations } from '../helpers';
import Card from './card';

export class CardList extends Component {
  constructor(props) {
    super(props);
  }

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
        this.props.setPayments(data);
        this.props.updateTotalDonate(amount);
      }).catch(() => {
        this.props.fetchFail(errorMessage);
      });
  }

  payments = (i) => {
    if (this.props.payments && this.props.payments.length) {
      const arr = this.props.payments.filter(x => x.charitiesId === (i + 1));
      const total = arr.reduce((a, b) => a + b.amount, 0)
      return total.toString() + arr[0].currency;
    }
  }

  render () {
    return (
      <div className="container-fluid mt-1">
        <div className="row no-gutters">
          {this.props.charities.map((item, i) =>
            <Card key={i} item={item} i={i} payments={this.payments(i)} />
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
    payments: state.payments,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTotalDonate, setCharities, showAmounts, fetchFail, setPayments
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
