import React from 'react';
import ShopItems from './ShopItems.jsx';

class Shop extends React.Component {

    constructor(props){
		super(props);
        
        //the state
        this.state = {
                items : {},
                itemsBought : {},
                currency : '',
                currencyConverstion : 1
        };

        //start user answers object, but if certain type of input put in default value
        //this.state.databaseRequest = this.dynamicResults(this.state.questions, 'str');
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

   


    //render it!
  
	render(){
		return (
			<div>
                <main>
                    <ShopItems items={this.state.items}/>
                </main>
            </div>
		)
	}
}
export default Shop