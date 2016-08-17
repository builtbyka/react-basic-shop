import React from 'react';
import Form from './form/form.jsx';
import Error from './feedback/error.jsx';
import Success from './feedback/success.jsx';

class InputElement extends React.Component {

    constructor(props){
        super(props);
        this.state = this.props.state;
        this.state.closeTheForm = false;
        this.state.formToComplete = !this.props.answered;
        this.state.formCTA = 'Submit';
        this.state.errorMessage = false;

        this.editForm = this.editForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.onFormInput = this.onFormInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFormResult = this.onFormResult.bind(this);
    }

     //update answers when form is interacted with

    onFormInput(eo){
        let se = eo.currentTarget;
        let answersNew = Object.assign({}, this.state.userAnswers);
        answersNew[se.name] = se.value;
        this.setState({userAnswers : answersNew});
    }

    //editForm should show previous entry

    editForm(){
        this.setState({formToComplete : true});
        this.setState({closeTheForm : true});
        this.setState({successMessage : false});
    }

    closeForm(e){
        e.preventDefault();
        this.setState({formToComplete : false});
    }

    //on submit

    onSubmit(e){
        e.preventDefault();
        let submission = {userID: this.state.userID,environment:this.state.environment,instanceID:this.state.instance};
        for (var attrname in this.state.userAnswers) { submission[attrname] = this.state.userAnswers[attrname]; }
        fetch('https://ib-ed.tech/api/exercise/'+this.state.id, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify([submission])
        }).then(
            response => {
                    if(response.status === 200){
                        this.setState({successMessage:true});
                        this.onFormResult();

                    }else{
                        this.setState({errorMessage:true});
                    }
                }
            )
    }

    onFormResult(){
        this.setState({formToComplete:false, showResult:true, showFeedback: true,  formCTA: 'Resubmit'});
    }

	render(){
        let error, success, form = (<button onClick={this.editForm} className="appearing">Edit form</button>);
        if(this.state.errorMessage){
            error = (<Error/>);
        }
        if(this.state.successMessage){
            success = (<Success/>);
        }
        if(this.state.formToComplete){
            form = ( <Form components={this.state.questions} prefill={this.state.userAnswers} onSelect={this.onFormInput} onSubmit={this.onSubmit} closeTheForm={this.state.closeTheForm} closeForm={this.closeForm} cta={this.state.formCTA}/>);
        }

		return (
            <div>
                {error}
                {success}
                {form}
            </div>
		)
	}
}


export default InputElement