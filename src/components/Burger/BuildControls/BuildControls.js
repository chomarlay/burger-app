import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'}
]

const buildControls = (props) => {
    
    return (
        
    <div className={classes.BuildControls}>
    <p>Total Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
    {
        controls.map((ctrl) => 
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                disabled={props.disabled[ctrl.type]}
                addIngredient={() => props.addIngredient(ctrl.type)
                }
                deleteIngredient={() => props.deleteIngredient(ctrl.type)}
 
            />
 
        )
    }
    <button className={classes.OrderButton} 
    disabled={!props.purchasable}
    onClick={props.ordered}
    >ORDER NOW</button>
    </div>
    )
}
export default buildControls;