import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 0 5vh 0;
`;

export const HeaderContent = styled.div`
  h6 {
    margin: 1px 0 0 0;
  }
  .donations {
    pointer-events: none;
    margin-top: 20px;
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
