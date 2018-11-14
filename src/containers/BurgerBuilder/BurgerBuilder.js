import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:1.0,
    cheese:0.6,
    meat:1.4
}
class BurgerBuilder extends Component{
    state={ 
        ingredients: {
        salad: 0,
        bacon: 0,
        cheese:0,
        meat: 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false,

    }
    updatePurchaseState = (updatedIngredients) => {
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(updatedIngredients).map(igKey => {
            return (
                updatedIngredients[igKey])
        }
        ).reduce((s, el) => {
            return (
                s = s + el)
        }, 0);
        this.setState({purchasable:(sum>0)});
    };


    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalPrice : newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

    };
    deleteIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceDeduction;
        this.setState({totalPrice : newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        alert ('Continue order');
    }
    
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return (
        <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients ={ this.state.ingredients}/>
                <BuildControls 
                    totalPrice = {this.state.totalPrice}
                    addIngredient ={this.addIngredientHandler}
                    deleteIngredient={this.deleteIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />

        </Auxilary>
    )
    }
}
export default BurgerBuilder;
