import React from 'react';

class Textarea extends React.Component {
	render(){
        let {name, onInput, prefill} = this.props;
		return (
            <div>
              <textarea name={name} onChange={onInput} defaultValue={prefill}></textarea>
            </div>
		)
	}
}


export default Textarea