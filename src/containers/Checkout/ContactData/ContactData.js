import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{

    state = {
        name:'',
        email:'',
        address: {street:'',
        postcode:''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault ();
        this.setState ({loading:true});
        const order = {
            ingredients : this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Kermit',
                address: '123 Street, Sydney',
                postcode: 2000
            },
            email: 'abc@abc.com',
            deliverMethod: 'uberEat'
        }
        axios.post('/orders.json', order)// add .json for firebase
        .then (response=>{
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error=>
            this.setState({loading:false}))
            ;  

        
    }
    render(){ 
        let form=(
            <form>
            <input className={classes.Input} type='text' name="name" placeholder="Your Name"></input>
            <input className={classes.Input} type='email' name="name" placeholder="Your Email"></input>
            <input className={classes.input} type='text' name="street" placeholder="Street"></input>
            <input className={classes.Input} type='text' name="postalCode" placeholder="Postal Code"></input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return(
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    )
    }
}
export default ContactData;