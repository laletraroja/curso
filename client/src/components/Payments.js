import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
                name="Encueztas"
                description="Cargue su billetera!"
                amount={500}
                token={token => this.props.handleToken (token)}
                stripeKey={process.env.REACT_APP_STRIKE_KEY}
            >
                <button className="button"> Cargar billetera</button>
            </StripeCheckout>    
        );
    }
}

export default connect (null,actions) (Payments);