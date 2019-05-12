import React from 'react';
import Header from '../containers/header';
import CardList from '../containers/card_list';
import { Container } from '../style';
import ErrorBoundary from '../containers/error_boundary';

export default function App() {
  return (
    <Container>
      <div className="text-center">
        <Header />
        <ErrorBoundary>
          <CardList />
        </ErrorBoundary>
      </div>
    </Container>
  );
};
