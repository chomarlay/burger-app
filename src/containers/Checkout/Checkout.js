import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state={ 
        ingredients: {salad:1, cheese:1, bacon:1}
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const theIngredients = {};
        for (let param of query.entries()) {
            theIngredients[param[0]] = +param[1];
        }
        this.setState({ingredients:theIngredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
        <div>
            <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
        </div>
        )
    }

}
export default Checkout;
