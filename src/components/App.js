import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { summaryDonations } from '../helpers';
import CardList from '../containers/card_list';
import { handlePay, updateTotalDonate, setCharities, setAmounts, selectAmount, hideAlert } from '../actions/index';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

const Container = styled.div`
  padding: 20px 0 5vh 0;
  h6 {
    margin: 1px 0 0 0;
  }
  .donations {
    pointer-events: none;
    margin-top: 20px;
  }
`;

export default connect((state) => state)(
  class App extends Component {
    constructor(props) {
      super();
    }

    componentDidMount() {
      fetch('http://localhost:3001/charities')
        .then((resp) => { return resp.json(); })
        .then((data) => {
          setCharities.call(this, data);
          setAmounts.call(this, Array(data.length).fill(false))
        });

      fetch('http://localhost:3001/payments')
        .then((resp) => { return resp.json() })
        .then((data) => {
          const amount = summaryDonations(data.map(item => item.amount));
          updateTotalDonate.call(this, amount);
        })
    }

    donate = (index) => {
      const arr = this.props.amounts.map((value) => false);
      arr[index] = true;
      setAmounts.call(this, arr);
      selectAmount.call(this, 10)
    }

    closeModal = () => {
      const arr = this.props.amounts.map((value) => false);
      setAmounts.call(this, arr);
    }

    renderModal = (item, index) => {
      const payments = [10, 20, 50, 100, 500].map((amount, j) => (
        <label key={j} className="btn">
          <input
            type="radio"
            name="payment"
            defaultChecked={ amount === 10 ? true : false }
            onClick={() => {
              selectAmount.call(this, amount)
            }} /> {amount}
        </label>
      ));

      if (this.props.amounts[index] === true) {
        return (
          <div className="overlay">
            <button className="close" onClick={() => this.closeModal()}>
              <span>&times;</span>
            </button>
            <div className="donate">
              <div>
                <div>Select the amount to donate (THB)</div>
                {payments}
                <div>
                  <a>
                    <button className="btn btn-outline-primary" onClick={
                      handlePay.call(this,
                        item.id,
                        this.props.selectedAmount,
                        item.currency,
                        item.name)}>Pay
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <SweetAlert
              show={this.props.showAlert}
              confirmButtonText="Close"
              title="Thanks!"
              text={this.props.message}
              onConfirm={hideAlert.call(this)}
            />
          </div>
        );
      }
      return null;
    }

    render = () => {
      return (
        <Container>
          <div className="container-fluid text-center">
            <img width="300" src="https://camo.githubusercontent.com/adbaf9d8c7a4bab9ad3685609955620ad32b64e8/68747470733a2f2f63646e2e6f6d6973652e636f2f6173736574732f6f6d6973652d6c6f676f2f6f6d6973652d776f72646d61726b2e706e67" />
            <div>
              <button className="btn btn-light donations">
                <h6>
                  DONATIONS:&nbsp;
                  <span className="badge badge-primary">
                    {this.props.donate}THB
                  </span>
                </h6>
              </button>
            </div>
            <CardList charities={this.props.charities}
              renderModal={this.renderModal}
              donate={this.donate}
            />
          </div>
        </Container>
      );
    }
  }
);
