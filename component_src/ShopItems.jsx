import React from 'react';

class ShopItems extends React.Component {

    constructor(props){
		super(props);
        
        //the state
        this.state = {
                items : {}
        };

        this.handleClick = this.handleClick.bind(this);
	}

    componentWillReceiveProps(nextProps){
        this.setState({
            items : nextProps.items
        })
    }

    handleClick(e){
        let math = e.currentTarget.value,
        item = e.currentTarget.getAttribute('data-item'),
        items = Object.assign({}, this.state.items);
        if(math === '-'){
            if(items[item].quantity > 0){
                items[item].quantity -= 1;
            }
        }else{
            items[item].quantity += 1;
        }

        this.setState({items : items})
        
    }
   
    //render it!
  
	render(){
        let items = this.props.items, counter = 0, shopItems;
        if(Object.keys(items).length !== 0 && items.constructor === Object){
            shopItems = Object.keys(items).map(
                key => {
                    counter ++;
                    return(
                        <li key={"shopitem_"+counter}>
                            <div>
                                <h1>{key}</h1>
                                <div className="image-wrap">
                                    <img src={items[key].Image}/>
                                </div>
                                <p>£{items[key].Price} {items[key].Measure}</p>
                                <div className="button-wrap">
                                    <button data-item={key} value="-" onClick={this.handleClick}>-</button><span>{this.state.items[key].quantity}</span><button data-item={key} value="+" onClick={this.handleClick}>+</button>
                                </div>
                            </div>
                        </li>
                    )
                }
            )
        }
		return (
			<ul id="shopping-list">
                {shopItems}
            </ul>
		)
	}
}
export default ShopItems