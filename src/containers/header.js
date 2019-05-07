import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderContent } from '../style';

class Header extends Component {
  render() {
    return (
      <HeaderContent>
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
      </HeaderContent>
    );
  }
}

function mapStateToProps(state) {
  return {
    donate: state.donate,
  };
}

export default connect(mapStateToProps)(Header);
