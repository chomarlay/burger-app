import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{
    state={ ingredients: {
        salad: 0,
        bacon: 0,
        cheese:0,
        meat: 0

    }}
    render () {
        return (
        <Auxilary>
            <main>
                <Burger ingredients ={ this.state.ingredients}/>
                <p>Burger Controls</p>
            </main>
        </Auxilary>
    )
    }
}
export default BurgerBuilder;
