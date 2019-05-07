import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTotalDonate, showAmounts, selectAmount, toggleAlert, updateMessage } from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CardContent } from '../style';

class Card extends Component {
  donate = (index) => {
    const arr = this.props.amounts.map(value => false);
    arr[index] = true;
    this.props.showAmounts(arr);
    this.props.selectAmount(10);
  }

  handlePay = (id, amount, currency, name) => {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: JSON.stringify({ charitiesId: id, amount, currency }),
      headers: {'Content-Type': 'application/json'},
    })
      .then((resp) => { return resp.json() })
      .then(() => {
        this.props.updateTotalDonate(amount);
        this.props.toggleAlert(true);
        this.props.updateMessage(`You've just donated ${amount}THB to ${name}!`);
      });
  }

  renderModal = (item, index) => {
    const payments = [10, 20, 50, 100, 500].map((amount, j) => (
      <label key={j} className="btn">
        <div className="d-flex align-items-center">
          <input
            type="radio"
            name="payment"
            defaultChecked={ amount === 10 ? true : false }
            onClick={() => this.props.selectAmount(amount)}
          />&nbsp;{amount}
        </div>
      </label>
    ));

    if (this.props.amounts[index] === true) {
      return (
        <div className="overlay">
          <ReactCSSTransitionGroup
            transitionName="transition"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            <button className="close" onClick={() => this.closeModal()}>
              <span>&times;</span>
            </button>
            <div className="donate">
              <div>
                <div>Select the amount to donate (THB)</div>
                {payments}
                <div>
                  <button className="btn btn-outline-primary" onClick={() =>
                    this.handlePay(item.id, this.props.selectedAmount, item.currency, item.name)
                  }>
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      );
    }
    return null;
  }

  closeModal = () => {
    const arr = this.props.amounts.map((value) => false);
    this.props.showAmounts(arr);
  }

  render() {
    return (
      <CardContent className="card text-center col-xl-5 col-lg-5 col-md-5 col-sm-12 ml-auto mr-auto">
        <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url('images/${this.props.item.image}')` }} className="image" />
        <div className="d-flex justify-content-between align-items-center">
          <div className="p-3 text-left">{this.props.item.name}</div>
          <a className="p-3" onClick={() => this.donate(this.props.i)}>
            <button className="btn btn-outline-primary">Donate</button>
          </a>
        </div>
        {this.renderModal(this.props.item, this.props.i)}
      </CardContent>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.message,
    amounts: state.amounts,
    selectedAmount: state.selectedAmount,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTotalDonate, showAmounts, selectAmount, toggleAlert, updateMessage,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
