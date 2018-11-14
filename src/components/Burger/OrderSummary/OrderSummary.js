import React from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';
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
        <p>Total Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
        <p>A burger with the following ingredients</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to Checkout?</p>
        <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
    </Auxilary>
    );
}
export default orderSummary;