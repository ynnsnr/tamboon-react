import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import { summaryDonations } from '../helpers';

import CardList from '../containers/card_list';
import handlePay from '../actions/index';

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

      this.state = {
        charities: [],
        selectedAmount: 10,
        showModal: [],
        show: false,
      };
    }

    componentDidMount() {
      fetch('http://localhost:3001/charities')
        .then((resp) => { return resp.json(); })
        .then((data) => {
          this.setState({
            charities: data,
            showModal: Array(data.length).fill(false),
          }) });

      fetch('http://localhost:3001/payments')
        .then((resp) => { return resp.json() })
        .then((data) => {
          this.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => (item.amount))),
          });
        })
    }

    donate = (index) => {
      const arr = this.state.showModal.map((value) => false);
      arr[index] = true;
      this.setState({ showModal: arr })
    }

    closeModal = () => {
      const arr = this.state.showModal.map((value) => false);
      this.setState({ showModal: arr })
    }

    renderModal = (item, index) => {
      const payments = [10, 20, 50, 100, 500].map((amount, j) => (
        <label key={j} className="btn">
          <input
            type="radio"
            name="payment"
            defaultChecked={ amount === 10 ? true : false }
            onClick={() => {
              this.setState({ selectedAmount: amount })
            }} /> {amount}
        </label>
      ));

      if (this.state.showModal[index] == true) {
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
                  <a onClick={() => this.setState({ show: true })}>
                    <button className="btn btn-outline-primary" onClick={
                      handlePay.call(this,
                        item.id,
                        this.state.selectedAmount,
                        item.currency,
                        item.name)}>Pay
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <SweetAlert
              show={this.state.show}
              confirmButtonText="Close"
              title="Thanks!"
              text={this.props.message}
              onConfirm={() => this.setState({ show: false })}
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
            <CardList charities={this.state.charities}
              renderModal={this.renderModal}
              donate={this.donate}
            />
          </div>
        </Container>
      );
    }
  }
);
