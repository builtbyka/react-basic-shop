import React from 'react';
import Checkbox from './components/Checkbox.jsx';
import Dropdown from './components/Dropdown.jsx';
import Slider from './components/Slider.jsx';
import Text from './components/Text.jsx';
import Textarea from './components/Textarea.jsx';

class FormComponents extends React.Component {

    inputType(props){
        let {type, options, onSelect, feedback, name, prefill} = this.props;
        let inputs = {
            checkbox : (<Checkbox/>),
            dropdown : (<Dropdown name={name} prefill={prefill} onSelect={onSelect} options={options}/>),
            slider: (<Slider name={name} onSelect={onSelect} options={options}/>),
            text : (<Text prefill={prefill} name={name} onSelect={onSelect}/>),
            textarea : (<Textarea prefill={prefill} name={name} onInput={onSelect}/>) 
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