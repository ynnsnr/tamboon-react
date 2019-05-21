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
          <img height="40" src="images/omise.png" />
          <button className="btn btn-light donations">
            <h6>
              <span className="donations-title">DONATIONS:&nbsp;</span>
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
