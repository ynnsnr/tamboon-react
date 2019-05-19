import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPayments, fetchCharities } from '../actions';
import Card from './card';

export class CardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCharities();
    this.props.fetchPayments();
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
  return bindActionCreators({ fetchPayments, fetchCharities }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
