import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'

class ContactData extends Component{

    state = {
        name:'',
        email:'',
        address: {street:'',
        postcode:''
        }
    }
    render(){ return(
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            <form>
                <input className={classes.Input} type='text' name="name" placeholder="Your Name"></input>
                <input className={classes.Input} type='email' name="name" placeholder="Your Email"></input>
                <input className={classes.input} type='text' name="street" placeholder="Street"></input>
                <input className={classes.Input} type='text' name="postalCode" placeholder="Postal Code"></input>
                <Button btnType="Success">ORDER</Button>
            </form>
        </div>
    )
    }
}
export default ContactData;