import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{
    render () {
        return (
        <Auxilary>
            <main>
                <Burger/>
                <p>Burger Controls</p>
            </main>
        </Auxilary>
    )
    }
}
export default BurgerBuilder;
