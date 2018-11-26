import React from 'react';
import Card from './card';

const CardList = (props) => {
  return (
    <div className="row no-gutters">
      {
        props.charities.map((item, index) =>
          <Card key={index}
            item={item}
            i={index}
            renderModal={props.renderModal}
            donate={props.donate}
          />
        )
      }
    </div>
  );
};

export default CardList;

