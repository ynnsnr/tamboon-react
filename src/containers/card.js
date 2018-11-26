import React, { Component } from 'react';
import styled from 'styled-components';

const CardContent = styled.div`
  margin: 30px 0;
  box-shadow: 0 6px 20px 0 rgba(0,0,0,.19);
  .image {
    height: 33vh;
    background-size: cover;
  }
  .overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(255,255,255,0.9);
    .close {
      margin: 1px 8px 0 0;
    }
  }
  .donate {
    width: 100% !important;
    height: 70% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  &:hover {
    background: rgba(248,249,250,1);
  }
`;

class Card extends Component {
  render() {
    return (
      <CardContent className="card text-center col-xl-5 col-lg-5 col-md-5 col-sm-12 ml-auto mr-auto">
        <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url('images/${this.props.item.image}')` }} className="image"></div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="p-3 text-left">{this.props.item.name}</div>
          <a className="p-3" onClick={() => this.props.donate(this.props.i)}>
            <button className="btn btn-outline-primary">Donate</button>
          </a>
        </div>
        {this.props.renderModal(this.props.item, this.props.i)}
      </CardContent>
    );
  }
}

export default Card;
