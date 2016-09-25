import React from 'react';

class CountrySelector extends React.Component {

    constructor(props){
		super(props);
        
        //the state
        this.state = {
                countries : {
                    UK : {
                        unit : 'GBP',
                        symbol : '£',
                    },
                    USA : {
                        unit : 'USD',
                        symbol : '$',
                    },
                    Australia : {
                        unit : 'AUD',
                        symbol : '$',
                    },
                    Germany : {
                        unit: 'EUR',
                        symbol : '€',
                    },
                    China : {
                        unit : "CNY",
                        symbol : '¥',
                    }
                }
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    // select country - pass on unit and symbol
    handleOnChange(e){
        let selectedCurrency = this.state.countries[e.currentTarget.value];
        this.props.onChange(selectedCurrency);
    }

   //render it!
  
    render(){
        let counter = 0,
         opts = Object.keys(this.state.countries).map(   
            key => {
                counter ++;
                return (
                    <option key={counter} value={key}>{key}</option>
                )
                
            }
        );
            return (
                <div id="country-selector">
                    <p>Price your basket where you live!</p>
                    <label>Your location:</label>
                    <select onChange={this.handleOnChange}>
                        {opts}
                    </select>
                </div>
            )
	    }
}
export default CountrySelector
