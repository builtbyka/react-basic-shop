import React from 'react';

class Filter extends React.Component {
  
	render(){
        let {filters, onChange} = this.props,
        counter = 0,
        filterOps = filters.map(
            filter => {
                counter ++;
                return(
                    <option key={counter} value={filter}>{filter}</option>
                )
            }
        );
		return (
            <div id="filters">
                <select onChange={onChange}>
                    {filterOps}
                </select>
		    </div>
        )
	}
}


export default Filter