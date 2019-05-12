import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 0 5vh 0;
`;

export const HeaderContent = styled.div`
  img {
    margin-bottom: 12px;
  }
  h6 {
    margin: 1px 0 0 0;
  }
  .donations {
    pointer-events: none;
    margin-top: 12px;
  }
  nav {
    width: 100%;
    top: 0;
    left: 0;
    background: white;
    z-index: 1;
  }
  .fixed-nav {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    transition: box-shadow .3s;
    position: fixed;
    .donations {
      margin-bottom: 12px;
    }
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
