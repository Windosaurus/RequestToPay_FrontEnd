// We only have 1 presenter

// -------------------

// It's responsibilities are:
// - handle events due to user input, talk to model layer, then get updates in view again
// - when handling events, it will speak to model layer (models/index.js):
//     - tell view to show it is waiting for a response (if it chooses to represent this)
//     - make use of a model layer
// - when receiving info from model layer, it will:
//     - update view data (to package up the information for the view)
//     - then send the view data back to the view

import React, { Component } from 'react'
import constants from "./constants";
import Login from './views/Login'
import Menu from "./components/Menu"
import OrderTypeMenu from "./views/OrderTypeMenu"
import {getEntityIdByUsername} from './models'
import {CardList} from "./views/CardList"
import './Presenter.css'

const VIEW = constants.VIEW;
const PERSONA = constants.PERSONA;
const STATUS = constants.STATUS;

// TODO: Assure that we can open a card list of ANY TYPE. Currently only 'Customer Unpaid' is an option.

class Presenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: VIEW.login,
    };
    this.loginHandler = this.loginHandler.bind(this);
    global.presenter = this;  // TODO: singleton pattern?
  }

  // Transitions -----------------------------//
  // TODO: replace with hashmap pattern?
  transitionTo(view){
    switch(view){
      case VIEW.login:
        this.transitionToLogOut();
        break;

      case VIEW.home:
        this.transitionToHome();
        break;

      case VIEW.cardList:
         this.transitionToCardList();
         break;

      default:
        this.transitionToHome();
        break;
    }
  }

  transitionToLogOut(){
    this.setMenuColor('transparent');
    global.loggedIn = false;
    global.username = 'Not Logged In!';
  }

  transitionToHome(){
    this.setState({currentView: VIEW.home});
  }

  transitionToCardList(){
    this.setState({currentView: VIEW.cardList,});
    this.setMenuColor('var(--ORANGE)');
  }

  // TODO: Remove when Buyer Invoice page created.
  // This is currently testing that a function would be properly called.
  TEMPtransitionToInvoice(ID) {
    console.log("TEST: Would Transition To Invoice - " + ID);
  }

  // transitionToSellerList(){}       // TODO: Later
  // transitionToBuyerInvoice(ID){}   // TODO: Later
  // transitionToSellerInvoice(ID){}  // TODO: Later
  // transitionToPayID(ID){}          // TODO: Later

  // Log In Methods ----------------------------//

  loginHandler(username){
    this.setLoggedIn(true);
    this.setUsername(username);
    this.transitionTo(VIEW.home);
    getEntityIdByUsername(username, this.setEntityId);
  }

  // Global Setters ---------------------------//

  setLoggedIn(isLoggedIn){
    global.loggedIn = isLoggedIn;
  }

  setUsername(username){
    global.username = username;
  }

  setEntityId(entityId) {
    global.entityId = entityId;
  }

  setViewPersona(persona) {
    global.viewPersona = persona;
  }

  setViewStatus(status) {
    global.viewStatus = status;
  }

  setMenuColor(color) {
    global.menuColor = color;
  }

  // Views to pass ----------------------------------//
  viewSwitch(view){
    switch(view){
      case VIEW.login:
        return <Login/>;
      case VIEW.home:
        return <OrderTypeMenu/>;
      case VIEW.cardList:
        return <CardList/>;
      default:
        return <OrderTypeMenu/>;
    }
  }

  // Return appropriate view to Index.js -----------//

  render() {
    return (
      <div id="presenter_block">
        <Menu/>
        {this.viewSwitch(this.state.currentView)}
      </div>
    )
  }
}

export default Presenter;
