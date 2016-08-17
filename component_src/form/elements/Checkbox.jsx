import React from 'react';

class Checkbox extends React.Component {
    constructor(props){
        super(props);
        this.checkChange = this.checkChange.bind(this);
    }

    checkChange(eo){
        let ob = {};
        ob.checked = eo.currentTarget.checked;
        ob.questionName = this.props.questionName;
        ob.questionID = this.props.questionID;
        this.props.selected(ob);
    }

	render(){
		return (
              <input onChange={this.checkChange} type="checkbox"/>
		)
	}
}


export default Checkbox