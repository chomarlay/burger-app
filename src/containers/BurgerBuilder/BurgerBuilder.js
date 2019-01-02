import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:1.0,
    cheese:0.6,
    meat:1.4
}
class BurgerBuilder extends Component{
    state={ 
        ingredients: null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading: false,
        error: false

    }
    componentDidMount () {
        axios.get('https://my-burger-proj1.firebaseio.com/ingredients.json')
        .then (response=> {
            this.setState ({ingredients : response.data });
        } )
        .catch (error=>{this.setState({error:true})});
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
        // alert ('Continue order');
        // this.setState ({loading:true});
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Kermit',
        //         address: '123 Street, Sydney',
        //         postcode: 2000
        //     },
        //     email: 'abc@abc.com',
        //     deliverMethod: 'uberEat'
        // }
        // axios.post('/orders.json', order)// add .json for firebase
        // .then (response=>
        //     this.setState({loading:false, purchasing:false}))
        // .catch(error=>
        //     this.setState({loading:false, purchasing:false}))
        //     ;  
        this.props.history.push('/checkout');
    }
    
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let burger = this.state.error ? <p>Error loading ingeredients!!</p>:<Spinner/>;

        let orderSummary = null;
        if (this.state.ingredients) {
            burger =
                <Auxilary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        addIngredient={this.addIngredientHandler}
                        deleteIngredient={this.deleteIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Auxilary>
            orderSummary =
                <OrderSummary ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}
                />

        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
        <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}


        </Auxilary>
    )
    }
}
export default withErrorHandler(BurgerBuilder, axios);
