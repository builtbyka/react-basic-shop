import React from 'react';
import FormBuilder from './formBuilder.jsx';

class Form extends React.Component {
    
    constructor(props){
        super(props);
    }
	render(){
        let {components, onSelect, onSubmit} = this.props,
        counter = 0,
        FormBuilding = Object.keys(components).map(
            key => {
                counter ++;
                return (
                    <FormBuilder onSelect={onSelect} key={counter} question={key} name={components[key].name} type={components[key].type} options={components[key].options}/>
                )
                
            }
        );
		return (
           <div>
                <form>
                    {FormBuilding}
                    <input id="submit" onClick={onSubmit} type="submit" value="Submit" />
                </form>
          </div> 
		)
	}
}


export default Form