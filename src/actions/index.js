export default function handlePay(id, amount, currency, name) {
  return () => {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: JSON.stringify({ charitiesId: id, amount, currency }),
      headers: {'Content-Type': 'application/json'},
    })
      .then((resp) => { return resp.json(); })
      .then(() => {
        this.props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount,
        });
        this.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: `You've just donated ${amount}THB to ${name}!`,
        });
      });
  }
}
