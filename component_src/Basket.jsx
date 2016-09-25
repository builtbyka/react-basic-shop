import React from 'react';
import Checkout from './Checkout.jsx';

class Basket extends React.Component {

    constructor(props){
		super(props);
        
        //the state
        this.state = {
                itemsBought : {},
                basketTotal : 0,
                atCheckout : false,
        };

         this.handleClick = this.handleClick.bind(this);

    }

    //expecting the items along with the items bought

   componentWillReceiveProps(nextProps){
        // calculate total
        let basketTotal;
        if(Object.keys(nextProps.itemsBought).length !== 0 && nextProps.itemsBought.constructor === Object){
            let loopItems = Object.keys(nextProps.itemsBought).map(
                key => {
                    let boughtItems = 0,
                        itemTotal = (Math.round(nextProps.itemsBought[key].Price * nextProps.itemsBought[key].amount * 100)/100);
                    boughtItems += itemTotal;
                    return (boughtItems)
                }

            )
            basketTotal = loopItems.reduce((a, b) => a + b, 0).toFixed(2);
        }else{
            basketTotal = 0;
            basketTotal = basketTotal.toFixed(2);
        }
        // with newly received items, itemsbought and total set the state. will change with purchases. 
       this.setState({
            itemsBought : nextProps.itemsBought,
            basketTotal : basketTotal
        })
    
    }

    handleClick(){
        let atCheckout = (this.state.atCheckout ? false : true);
        this.setState({atCheckout : atCheckout});
    }

  
   //render it!
  
    render(){
        let checkout;
            if(this.state.atCheckout){
                checkout = (<Checkout total={this.state.basketTotal} items={this.state.items} itemsBought={this.state.itemsBought}/>);
            }
            return (
                <div>
                    <div id="basket"><span className="currency">£</span><span className="total">{this.state.basketTotal}</span><button onClick={this.handleClick}>Checkout Now</button></div>
                    {checkout}
                </div>
            )
        }
    }
export default Basket