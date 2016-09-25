import React from 'react';
import ShopItems from './ShopItems.jsx';
import Basket from './Basket.jsx';

class Shop extends React.Component {

    constructor(props){
		super(props);
        
        //the state
        this.state = {
                items : {},
                itemsBought : {}
        };

        //start user answers object, but if certain type of input put in default value
        //this.state.databaseRequest = this.dynamicResults(this.state.questions, 'str');
        this.updateBasket = this.updateBasket.bind(this);
	}

    //recieve basket by json
    componentDidMount() {
        // get items from json and setstate. Feed in to shopitems jsx. Allows us to scale up shop by having dynamic items.
       fetch('./json/shop.json')
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        .then((results) => {
            this.setState({items : results});  
        });
    }

    //update basket with items bought

   updateBasket(item, amount){
       let itemsBought = Object.assign({}, this.state.itemsBought);
       //if changed mind and down to 0, remove from bought items list
       if(amount < 1){
           delete itemsBought[item];
       }else{
           itemsBought[item] = this.state.items[item];
       }
       this.setState({itemsBought : itemsBought});
   }

    //render it!
  
	render(){
		return (
			<div>
                <Basket itemsBought={this.state.itemsBought}/>
                <main>
                    <ShopItems items={this.state.items} updateBasket={this.updateBasket}/>
                </main>
            </div>
		)
	}
}
export default Shop