import React from 'react';
import Checkbox from './components/Checkbox.jsx';
import Dropdown from './components/Dropdown.jsx';
import Text from './components/Text.jsx';
import Textarea from './components/Textarea.jsx';

class FormComponents extends React.Component {

    inputType(props){
        let {type, options, onSelect, feedback, name} = props;
        let inputs = {
            checkbox : (<Checkbox/>),
            dropdown : (<Dropdown  onSelect={onSelect} options={options}/>),
            text : (<Text name={name} onSelect={onSelect}/>),
            textarea : (<Textarea name={name} onInput={onSelect}/>) 
        }
        return inputs[type];
    }

	render(){
        let question = this.props.question,
        input = this.inputType(this.props);
            
		return (
          <fieldset>
                <label>{question}</label>
                {input}
          </fieldset>
		)
	}
}


export default FormComponents