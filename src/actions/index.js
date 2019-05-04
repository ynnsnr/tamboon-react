export function handlePay(id, amount, currency, name) {
  return () => {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: JSON.stringify({ charitiesId: id, amount, currency }),
      headers: {'Content-Type': 'application/json'},
    })
      .then((resp) => { return resp.json(); })
      .then(() => {
        updateTotalDonate.call(this, amount);
        this.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: `You've just donated ${amount}THB to ${name}!`,
        });
        this.props.dispatch({
          type: 'SHOW_ALERT',
        });
      });
  }
}

export function updateTotalDonate(amount) {
  this.props.dispatch({
    type: 'UPDATE_TOTAL_DONATE',
    amount,
  });
}

export function setCharities(charities) {
  this.props.dispatch({
    type: 'SET_CHARITIES',
    charities,
  })
}

export function setAmounts(amounts) {
  this.props.dispatch({
    type: 'SET_AMOUNTS',
    amounts,
  })
}

export function selectAmount(amount) {
  this.props.dispatch({
    type: 'SELECT_AMOUNT',
    amount,
  })
}

export function hideAlert() {
  return () => {
    this.props.dispatch({
      type: 'HIDE_ALERT',
    })
  }
}
