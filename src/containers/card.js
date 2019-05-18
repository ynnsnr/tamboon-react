import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPayments, showAmounts, selectAmount, toggleAlert, updateMessage, fetchFail } from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CardContent } from '../style';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import CircularProgress from '@material-ui/core/CircularProgress';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  donate = (index) => {
    const arr = this.props.amounts.map(value => false);
    arr[index] = true;
    this.props.showAmounts(arr);
    this.props.selectAmount(10);
  }

  handlePay = (id, amount, currency, name) => {
    this.loading = true;
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: JSON.stringify({ charitiesId: id, amount, currency }),
      headers: {'Content-Type': 'application/json'},
    })
      .then((resp) => { return resp.json() })
      .then((data) => {
        this.props.updateMessage(`You've just donated ${amount}THB to ${name}!`);
        this.loading = false;
        setTimeout(() => {
          this.props.toggleAlert(true);
          this.props.fetchPayments();
        }, 1000);
      }).catch(() => {
        this.props.fetchFail('Payment could not be processed. Please try again.');
      });
  }

  renderModal = (item, index) => {
    const payments = [10, 20, 50, 100, 500].map((amount, j) => (
      <div key={j} className="md-radio">
        <input
          id={j}
          type="radio"
          name="payment"
          defaultChecked={ amount === 10 ? true : false }
          onClick={() => this.props.selectAmount(amount)}
        />
        <label htmlFor={j}>&nbsp;{amount}</label>
      </div>
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
            <div className={'donate'+(this.loading ? ' opacity' : '')}>
              <div>
                <h6>Select the amount to donate (THB)</h6>
                <div className="d-flex">{payments}</div>
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
          <div style={{position: 'absolute', top: 'calc(50% - 26px)', left: 'calc(50% - 20px)'}}>
            {this.loading ? <CircularProgress color="primary" /> : null}
          </div>
          <SweetAlert
            show={this.props.showAlert}
            confirmButtonText="Close"
            title="Thanks!"
            text={this.props.message}
            onConfirm={() => {
              this.props.toggleAlert(false);
              this.closeModal();
            }}
          />
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
        <div className="payments">
          <img src="images/hand-holding-usd.png" height="15" className="mr-1" />
          <strong>{this.props.payments}</strong>
        </div>
        <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)),
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
    showAlert: state.showAlert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPayments, showAmounts, selectAmount, toggleAlert, updateMessage, fetchFail,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
