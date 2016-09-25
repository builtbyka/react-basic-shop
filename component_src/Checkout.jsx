import React from 'react';

class Checkout extends React.Component {

    constructor(props){
		super(props);
        
        //the state
        this.state = {
                itemsBought : {},
                total : {}
        };

    }

   componentWillReceiveProps(nextProps){
        this.setState({
            itemsBought : nextProps.itemsBought,
            total : total
        })
    }

  
   //render it!
  
    render(){
            let itemsBought;
       		return (
			<div id="checkout"><div>
            <header>
                <h1>Checkout</h1>
                {itemsBought}
            </header>
            </div></div>
		)
	}
}
export default Checkout