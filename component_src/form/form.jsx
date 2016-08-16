import React from 'react';
import FormBuilder from './formBuilder.jsx';

class Form extends React.Component {
    
    constructor(props){
        super(props);
    }
	render(){
        let {components, onSelect, onSubmit, cta, prefill, formToComplete, closeForm, closeTheForm} = this.props,
        closeIt,
        counter = 0,
        FormBuilding = Object.keys(components).map(
            key => {
                counter ++;
                return (
                    <FormBuilder prefill={prefill[components[key].name]} onSelect={onSelect} key={counter} question={key} name={components[key].name} type={components[key].type} options={components[key].options}/>
                )
                
            }
        );
        if(closeTheForm){
            closeIt = (<button className="form-action" onClick={closeForm}>Close form</button>);
        }
		return (
           <div>
                <form>
                    {FormBuilding}
                    {closeIt}
                    <input id="submit" onClick={onSubmit} type="submit" value={cta} />
                </form>
          </div> 
		)
	}
}


export default Form