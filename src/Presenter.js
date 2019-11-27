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
import Home from "./views/Home"
import Login from './views/Login'
import {CardList} from "./views/CardList"
import Order from "./views/Order";
import Menu from "./components/Menu"
import Loading from "./views/Loading";
import constants from "./constants";
import './Presenter.css'

const VIEW = constants.VIEW;

// TODO: Assure that we can open a card list of ANY TYPE. Currently only 'Customer Unpaid' is an option.

class Presenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: VIEW.login,
      isLoading: false,
    };
    this.loginHandler = this.loginHandler.bind(this);
    global.presenter = this;  // TODO: singleton pattern?
  }

  // Transitions -----------------------------//
  // TODO: replace with hashmap pattern?
  /**
   * A function which calls helper functions to setup data for the next transition
   *
   * @param view - The name of the view being transitioned to
   * @param orderId - An optional parameter. This is necessary for the order view.
   * @param invoiceId - An optional parameter. This is necessary for the order view.
   */
  transitionTo(view, orderId, invoiceId){
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
      case VIEW.order:
        this.transitionToOrder(orderId, invoiceId);
        break;
      default:
        this.transitionToHome();
        break;
    }
    this.setCurrentView(view);
  }

  transitionToLogOut(){
    this.setState({currentView: VIEW.login});
    this.setCurrentView(VIEW.login);
    global.loggedIn = false;
    global.username = 'Not Logged In!';
  }

  transitionToHome(){
    this.setState({currentView: VIEW.home});
    this.setCurrentView(VIEW.home);
  }

  transitionToCardList(){
    this.setState({currentView: VIEW.cardList,});
    this.setCurrentView(VIEW.cardList);
  }

  // TODO: Remove when Buyer Order page created.
  // This is currently testing that a function would be properly called.
  transitionToOrder(orderId, invoiceId) {
    console.log("TEST: In Transition To Order - " + orderId);
    this.setState({currentView: VIEW.order,});
    this.setCurrentView(VIEW.order);
    this.setOrderID(orderId);
    this.setInvoiceID(invoiceId);
  }

  // transitionToSellerList(){}       // TODO: Later
  // transitionToBuyerInvoice(ID){}   // TODO: Later
  // transitionToSellerInvoice(ID){}  // TODO: Later
  // transitionToPayID(ID){}          // TODO: Later

  // Log In Methods ----------------------------//

  loginHandler(username, entityId){
    this.setLoggedIn(true);
    this.setUsername(username);
    this.setEntityId(entityId);
    this.transitionTo(VIEW.home);
  }

  // Request to Pay
  // TODO: Add payment actions here.
  processPayment(){
    console.log("TEST: Process payment for Order #" + global.viewOrderID);
    // TODO: add some function to backend.js to interact with Interac RTP
    // TODO: add some function to backend.js to change status of Invoice to Paid
    this.setState({currentView: VIEW.order,}); // return to view
  }

  // Loading transition ------------------------//

  startLoading(){
      this.setState({isLoading: true})
  }

  stopLoading(){
      this.setState({isLoading: false})
  }

  // Global Setters ----------------------------//

  setLoggedIn(isLoggedIn){
    global.loggedIn = isLoggedIn;
  }

  setUsername(username){
    global.username = username;
  }

  setEntityId(entityId) {
    global.entityId = entityId;
  }

  setCurrentView(view){
    global.currentView = view;
  }

  setViewPersona(persona) {
    global.viewPersona = persona;
  }

  setViewStatus(status) {
    global.viewStatus = status;
  }

  setInvoiceID(ID){
    global.viewInvoiceID = ID;
  }

  setOrderID(ID) {
    global.viewOrderID = ID;
  }

  // Views to pass ----------------------------------//
  viewSwitch(view){
    switch(view){
      case VIEW.login:
        return <Login/>;
      case VIEW.home:
        return <Home/>;
      case VIEW.cardList:
        return <CardList/>;
      case VIEW.order:
        return <Order/>;
      default:
        return <Home/>;
    }
  }

  // Return appropriate view to Index.js -----------//

  render() {
    return (
      <div id="presenter_block">
        {this.state.isLoading && <Loading currentView={this.state.currentView}/>}
        <Menu
          currentView={this.state.currentView}
        />
        {this.viewSwitch(this.state.currentView)}
      </div>
    )
  }
}

export default Presenter;
