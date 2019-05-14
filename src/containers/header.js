import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderContent } from '../style';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    this.setState({ scroll: window.scrollY });
  }

  componentDidMount() {
    const el = document.querySelector('nav');
    this.setState({ top: el.offsetTop, height: el.offsetHeight });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    this.state.scroll > this.state.top ?
      document.body.style.paddingTop = `${this.state.height}px` :
      document.body.style.paddingTop = 0;
  }

  render() {
    return (
      <HeaderContent>
        <nav className={this.state.scroll > this.state.top ? 'fixed-nav' : ''}>
          <img height="40" src="https://camo.githubusercontent.com/adbaf9d8c7a4bab9ad3685609955620ad32b64e8/68747470733a2f2f63646e2e6f6d6973652e636f2f6173736574732f6f6d6973652d6c6f676f2f6f6d6973652d776f72646d61726b2e706e67" />
          <button className="btn btn-light donations">
            <h6>
              DONATIONS:&nbsp;
              <span className="badge badge-primary">
                {this.props.donate}THB
              </span>
            </h6>
          </button>
        </nav>
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
