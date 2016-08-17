import React from 'react';

class Dropdown extends React.Component {

	render(){
        let {options, name, onSelect, prefill} = this.props,
        intVal,
        counter = 0,
            opts = Object.keys(options).map(   
            key => {
                counter ++;
                return (
                    <option key={counter} value={options[key]}>{options[key]}</option>
                )
                
            }
        );
		return (
            <div>
                <select name={name} onChange={onSelect} defaultValue={prefill}>
                    {opts}
                </select>
            </div>
		)
	}
}


export default Dropdown