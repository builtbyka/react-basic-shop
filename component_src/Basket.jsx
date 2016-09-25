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
         this.handleCheckoutClick = this.handleCheckoutClick.bind(this);

    }

    //expecting the items along with the items bought

   componentWillReceiveProps(nextProps){
        // calculate total in GBP in basket before checkout
        let basketTotal;
        if(Object.keys(nextProps.itemsBought).length !== 0 && nextProps.itemsBought.constructor === Object){
            // if itemsBought has length, add up the total
            let loopItems = Object.keys(nextProps.itemsBought).map(
                key => {
                    let boughtItems = 0,
                    itemTotal = (Math.round(nextProps.itemsBought[key].Price * nextProps.itemsBought[key].quantity * 100)/100);
                    boughtItems += itemTotal;
                    return (boughtItems)
                }

            )
            basketTotal = loopItems.reduce((a, b) => a + b, 0).toFixed(2);
        }else{
            // if not make it 0
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
        this.setState({atCheckout : true});
    }

    handleCheckoutClick(){
         this.setState({atCheckout : false});
    }

  
   //render it!
  
    render(){
        let checkout;
            if(this.state.atCheckout){
                checkout = (<Checkout onClick={this.handleCheckoutClick} total={this.state.basketTotal} itemsBought={this.state.itemsBought}/>);
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