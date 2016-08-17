import React from 'react';

class Text extends React.Component {
	render(){
        let {name, onSelect,prefill} = this.props;
		return (
            <div>
              <input onChange={onSelect} type="text" name={name} defaultValue={prefill}/>
            </div>
		)
	}
}


export default Text