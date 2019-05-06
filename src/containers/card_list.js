import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTotalDonate, setCharities, showAmounts, toggleAlert } from '../actions';
import { summaryDonations } from '../helpers';
import Card from './card';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class CardList extends Component {
  componentDidMount() {
    fetch('http://localhost:3001/charities')
      .then((resp) => { return resp.json() })
      .then((data) => {
        this.props.setCharities(data);
        this.props.showAmounts(Array(data.length).fill(false));
      });
    fetch('http://localhost:3001/payments')
      .then((resp) => { return resp.json() })
      .then((data) => {
        const amount = summaryDonations(data.map(item => item.amount));
        this.props.updateTotalDonate(amount);
      })
  }

  render () {
    return (
      <div>
        <div className="row no-gutters">
          {
            this.props.charities.map((item, index) =>
              <Card key={index} item={item} i={index} />
            )
          }
        </div>
        <SweetAlert
          show={this.props.showAlert}
          confirmButtonText="Close"
          title="Thanks!"
          text={this.props.message}
          onConfirm={() => this.props.toggleAlert(false)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    charities: state.charities,
    message: state.message,
    showAlert: state.showAlert
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTotalDonate, setCharities, showAmounts, toggleAlert
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
