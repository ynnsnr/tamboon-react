import React from 'react';
import Header from '../containers/header';
import CardList from '../containers/card_list';
import { Container } from '../style';

export default function App() {
  return (
    <Container>
      <div className="container-fluid text-center">
        <Header />
        <CardList />
      </div>
    </Container>
  );
};
