import React, { Component } from 'react';
import {getOrdersOverview} from '../data/CardData'
import {Card} from '../components/Card'
import "./CardList.css"
import constants from "../constants";

const VIEW = constants.VIEW;

/**
 * A component with a high-level view of every order of viewStatus 'viewStatus' where the entity 'entityId'
 * is listed as the viewPersona 'viewPersona'.
 *
 * @props entityId - The ID of the entity viewing the orders.
 * @props persona - The persona for which the orders pertain to (ie: entityId is seller or customer or driver).
 * @props status - The status of orders.
 * @props cardClickHandler - The function that is called to change views upon a card click
 */
export class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'ordersData': []
        };
        this.setOrdersData = this.setOrdersData.bind(this);
    }

    componentDidMount() {
        getOrdersOverview(global.entityId, global.viewPersona, global.viewStatus, this.setOrdersData);
    }

    setOrdersData(ordersData) {
        this.setState({'ordersData': ordersData});
    }

    createCards() {
        const cards = [];
        let keys = Object.keys(this.state.ordersData);
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            let orderId = this.state.ordersData[key].OID;
            let invoiceId = this.state.ordersData[key].InID;
            let card = <Card
                id={orderId}
                key={key}
                orderData={this.state.ordersData[key]}
                onClick={() => global.presenter.transitionTo(VIEW.order, orderId, invoiceId)}/>;
            cards.push(card);
        }
        return cards;
    }

    render() {
        return (
            <div id={'CardList_container'}>
                <div id={'CardList_header'}>
                    {global.viewStatus}
                </div>
                {this.createCards()}
            </div>
        );
    }
}
