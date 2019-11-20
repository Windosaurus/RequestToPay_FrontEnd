import constants from "../constants";
import React, { Component } from 'react';

const customer = constants.PERSONA.customer;
const unpaid = constants.STATUS.customer.unpaid.string;
const paid = constants.STATUS.customer.paid.string;
const completed = constants.STATUS.customer.completed.string;

class OrderTypeBuy extends Component {

  constructor(props) {
    super(props);
  }

  /* TODO: Replace the paid and completed lis with what is below, to have access to paid and completed orders */
  /* <li onClick={() => transitionToOrderList(customer, paid)}>{paid}</li>
   <li onClick={() => transitionToOrderList(customer, completed)}>{completed}</li> */

  render() {
    let {transitionToOrderList} = this.props;
    return (
      <div id="buy_wrapper">
        <div className={"home_block"} id={"buy_block"}>
          <div className={"type_block"}>
            <h1>Buying.</h1>
            <ul>
              <li onClick={() => transitionToOrderList(customer, unpaid)}>{unpaid}</li>
              <li><s>{paid}</s></li>
              <li><s>{completed}</s></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderTypeBuy;



