import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{
    render () {
        return (
        <Aux>
            <main>
                <Burger/>
                <p>Burger Controls</p>
            </main>
        </Aux>
    )
    }
}
export default BurgerBuilder;
