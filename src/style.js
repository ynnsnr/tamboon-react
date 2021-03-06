import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px 0 5vh 0;
`;

export const HeaderContent = styled.div`
  h6 {
    margin: 1px 0 0 0;
  }
  .donations {
    pointer-events: none;
  }
  .donations-title {
    display: inline;
  }
  @media only screen and (max-width: 400px) {
    .donations-title {
      display: none;
    }
  }
  nav {
    width: 100%;
    top: 0;
    background: white;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 5vw;
    margin: 0;
  }
  image {
    justify-content: center;
  }
  .fixed-nav {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    transition: box-shadow .3s;
    position: fixed;
  }
`;

export const CardContent = styled.div`
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
    opacity: 1;
    transition: opacity 1s;
  }

  .payments {
    position: absolute;
    top: 14px;
    right: 15px;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 3px;
  }

  .opacity {
    opacity: 0.4;
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
  .transition-appear {
    opacity: 0.01;
  }
  .transition-appear.transition-appear-active {
    opacity: 1;
    transition: opacity .5s;
  }

  @keyframes ripple {
    0% {
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0);
    }
    50% {
      box-shadow: 0px 0px 0px 15px rgba(0, 0, 0, 0.1);
    }
    100% {
      box-shadow: 0px 0px 0px 15px rgba(0, 0, 0, 0);
    }
  }
  .md-radio {
    margin: 16px 8px 24px 8px;
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + label:before {
      border-color: #337ab7;
      animation: ripple 0.2s linear forwards;
    }
    input[type="radio"]:checked + label:after {
      transform: scale(1);
    }
    label {
      display: inline;
      position: relative;
      padding: 1px 0 0 20px;
      cursor: pointer;
    }
    label:before, label:after {
      position: absolute;
      content: "";
      border-radius: 50%;
      transition: all 0.3s ease;
      transition-property: transform, border-color;
    }
    label:before {
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(0, 0, 0, 0.54);
    }
    label:after {
      top: 5px;
      left: 5px;
      width: 10px;
      height: 10px;
      transform: scale(0);
      background: #337ab7;
    }
  }
  @media only screen and (max-width: 400px) {
    .md-radio {
      margin-right: 2px;
    }
  }
`;

export const ErrorBoundaryContent = styled.div`
.MainTitle {
  display: block;
  font-size: 2rem;
  font-weight: lighter;
  text-align: center;
}
.MainDescription {
  max-width: 50%;
  font-size: 1.2rem;
  font-weight: lighter;
}
.Cog {
  width: 10rem;
  height: 10rem;
  fill: #6AAFE6;
  transition: easeInOutQuint();
  animation: CogAnimation 5s infinite;
}
@keyframes CogAnimation {
    0%   {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
}
`;
