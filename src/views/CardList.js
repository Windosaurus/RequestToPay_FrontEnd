import React, { Component } from 'react';
import {getOrdersOverview} from '../data/CardData'
import {Card} from '../components/Card'
import "./CardList.css"

/**
 * A component with a high-level view of every order of status 'status' where the entity 'entityId'
 * is listed as the persona 'persona'.
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
        let {entityId, persona, statusString} = this.props;
        getOrdersOverview(entityId, persona, statusString, this.setOrdersData);
    }

    setOrdersData(ordersData) {
        this.setState({'ordersData': ordersData});
    }

    createCards() {
        const cards = [];
        let keys = Object.keys(this.state.ordersData);
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            let id = this.state.ordersData[key].OID;
            let card = <Card
                id={id}
                key={key}
                orderData={this.state.ordersData[key]}
                onClick={() => this.props.cardClickHandler(id)}/>;
            cards.push(card);
        }
        return cards;
    }

    render() {
        let {status} = this.props;
        const childElements = this.createCards();
        return (
            <div id={'CardList_container'}>
                <div id={'CardList_header'}>
                    {status}
                </div>
                {childElements}
            </div>
        );
    }
}
