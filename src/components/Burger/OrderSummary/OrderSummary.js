import React from 'react';
import Auxilary from '../../../hoc/Auxilary';
// import classes from './OrderSummary.css';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }} >
                    {igKey}</span> :  {props.ingredients[igKey]}
            </li>);

        });
        
    return(
    <Auxilary>
        <h3>Order Summary</h3>
        <p>A burger with the following ingredients</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to Checkout?</p>
    </Auxilary>
    );
}
export default orderSummary;