import React from 'react';
import CountrySelector from './CountrySelector.jsx';

class Checkout extends React.Component {

    constructor(props){
		super(props);
        
        //the state
        this.state = {
                itemsBought : this.props.itemsBought,
                total : this.props.total,
                localTotal : 0,
                currency : {}
        };
         
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.currencySelector = this.currencySelector.bind(this);
    }

    handleCloseClick(){
        this.props.onClick();
    }

    //call for latest currency news on select. The market can change in a heartbeat and we want up to the minute prices!
    currencySelector(currency){
        if(currency.unit === 'GBP'){
            this.setState({currency: currency, localTotal : 0});
        }else{
            let notUS = (currency.unit === 'USD' ? '' : currency.unit);
            fetch('http://apilayer.net/api/live?access_key=18f8fb9fef144b5730d725a293e8d6af&currencies=GBP,'+notUS+'&format=1')
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((results) => {
                //taking from GBP to USD - divide. if not USD convert to new region
                let localTotal = (this.state.total / results.quotes.USDGBP).toFixed(2);
                if(currency.unit === 'USD'){
                    this.setState({currency: currency, localTotal : localTotal});
                }else{
                    localTotal = (localTotal * results.quotes['USD'+currency.unit]).toFixed(2);
                    this.setState({currency: currency, localTotal : localTotal});
                }
            });
        }

    }
  
   //render it!
  
    render(){
            let itemsBought, otherTotal, countrySelector;

            //loop items bought and display in checkout
            if(Object.keys(this.state.itemsBought).length !== 0 && this.state.itemsBought.constructor === Object){
                let items = this.state.itemsBought,
                counter = 0;
                itemsBought = Object.keys(items).map(
                    key => {
                        let price = (items[key].Price * items[key].quantity).toFixed(2);
                        counter ++;
                        return(<li key={"checkout_"+counter}>
                            <div className="item">
                                <h1>{key}</h1>
                                <div className="image-wrap">
                                    <img src={items[key].Image}/>
                                </div>
                                <p>£{items[key].Price.toFixed(2)} {items[key].Measure}</p>
                            </div>
                            <div className="purchases">
                                <p>Quantity: {items[key].quantity}</p>
                                <p>£{price}</p>
                            </div>

                            </li>)
                    }
                )
                //if anything in basket, display country selector to choose local price
                countrySelector = (<CountrySelector onChange={this.currencySelector}/>);
            }else{
                 itemsBought = (<li className="no-items">No items in your basket</li>);
            }
            // if countries isn't empty or our UK base then display alternative total
            if(Object.keys(this.state.currency).length !== 0 && this.state.currency.unit !== 'GBP'){
                otherTotal = (<li><div className="total-string"><h2>Local Total</h2></div><div className="total">{this.state.currency.symbol}{this.state.localTotal}</div></li>);
            }

       		return (
			<div id="checkout">
                <div>
                    <button onClick={this.handleCloseClick}>X</button>
                        <header>
                            <h1>Checkout</h1>
                        </header>
                        <ul>
                            {itemsBought}
                            <li><div className="total-string"><h2>Total</h2></div><div className="total">£{this.state.total}</div></li>
                            {otherTotal}
                        </ul>    
                          {countrySelector}
                </div>
            </div>
		)
	}
}
export default Checkout