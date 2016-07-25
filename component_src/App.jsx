import React from 'react';
import Feedback from './feedback/feedback.jsx';
import Form from './form/form.jsx';
import Thankyou from './feedback/thankyou.jsx';

class App extends React.Component {

    constructor(props){
		super(props);

        //get environment we're in first, so we know how to collect the other data
        let env = this.getEnv();

        //the state
        this.state = {
            id : 'BOILERPLATE',
            environment: env,
            userID: this.getUser(env),
            userImg: this.getUserImg(env),
            instance: this.getInstance(env),
            private: false,
            formToComplete : true,
            formCTA: 'Submit',
            showFeedback : false,
            showThanks : false,
            markers : [],
            questions : {
                'Example 1 question' : {
                    type : 'textarea',
                    name : 'example_1'              
                 },
                 'Example 2 question' : {
                    type : 'text', 
                    name : 'example_2'          
                 },
                  'Example 3 question' : {
                    type : 'dropdown', 
                    name : 'example_3',
                    options: ['Sun', 'Rain', 'Wind', 'Fog']          
                 },
            }, 
            userAnswers: {},
            answers: {},  
            databaseRequest: '',
        };

        //populate answers object and dynamic part of database request string with the questions here
        this.state.answers = this.dynamicResults(this.state.questions, 'obj');
        this.state.databaseRequest = this.dynamicResults(this.state.questions, 'str');

        this.editForm = this.editForm.bind(this);
        this.onFormInput = this.onFormInput.bind(this);
	}

    // uses the questions to create a dynamic string 

    dynamicResults(q, type){
        let counter, ans = {};
        if(type === 'str') ans = '';
        for(var key in q){ 
            if(type === 'str'){
                ans += q[key].name +',';
            }else{
                ans[q[key].name] = '';
            }         
        }
        return ans;
    }

    //What environment we working in? Needs work to be more robust
    
    getEnv(){
        function Env(env) {
            return window.location.href.indexOf(env) > 1;
        }
        switch (true) {
            case Env("edx"):
                return 'edx';
                break;
            case Env("hub"):
                return 'hub';
                break;
            default:
                return 'test';
        }
    }
    
    //Get username

     getUser(env){
        switch (env) {
            case 'edx':
                var user;
                if(document.getElementsByClassName("label-username").length > 0){
                    user = document.getElementsByClassName("label-username")[0].innerHTML;
                }else{
                    user = document.getElementsByClassName("account-username")[0].innerHTML;
                }
                return user;
                break;
            case 'hub':
                return 'hub';
                break;
            default:
                let math = Math.floor((Math.random() * 1000) + 1);
                return 'testUr';
                break;
        }
    }

    // get user image
    
    getUserImg(env){
         switch (env) {
            case 'edx':
                var img;
                if(document.getElementsByClassName("user-image-frame").length > 0){
                    img = document.getElementsByClassName("user-image-frame")[0].getAttribute('src');
                    console.log(img);
                    if(img.indexOf('?') > 0){
                        img = img.substring(0, img.indexOf('?'));
                    }
                }else{
                    img = 'https://d3vz9i37d3bazy.cloudfront.net/static/images/profiles/default_50.3455a6581573.png';
                }
                return img;
                break;
            case 'hub':
                return 'hub';
                break;
            default:
                return 'https://d289dve6l7hh6o.cloudfront.net/307b87aa814dc59bd15a1d1cc2bfc4bd_50.jpg';
                break;
        }
    }

    //get instance of activity (aka is this in term 1 etc)
    
    getInstance(env){
         switch (env) {
            case 'edx':
                let m = document.getElementById('main'),
                    instEl = m.getElementsByTagName('div'),
                    inst = instEl[0].getAttribute("data-course-id");
                    if(inst === null) inst = 'edx-preview';
                return inst;
                break;
            case "hub":
                return 'hub';
                break;
            default:
                return 'testcourse-term1';
        }
    }

    //initial state set, now get database results

    componentDidMount() {
        let dr = this.state.databaseRequest.substring(0, this.state.databaseRequest.length - 1),
        answeredRequest = 'SELECT '+dr+' FROM '+this.state.id+' WHERE userID="'+this.state.userID+'" AND instanceID="'+this.state.instance+'"';
        this.getRequest(answeredRequest, 'answered');
        if(!this.state.private){
            let pubRequest = 'SELECT '+dr+' FROM '+this.state.id+' WHERE instanceID="'+this.state.instance+'" AND userID !="'+this.state.userID+'"';
            this.getRequest(pubRequest, 'all');
        }
    }

    getRequest(request, requestType){
        let sql = encodeURI(request);      
        fetch('https://ib-ed.tech/api/exercise/'+sql)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((results) => {
                if(requestType === 'answered' && results.length > 0){
                    this.setState({formToComplete: false, showFeedback: true, userAnswers: results[0], formCTA: 'Resubmit'});
                }else{
                    this.setState({answers: results});

                }
               
            });
    }

    //update answers when form is interacted with

    onFormInput(eo){
        let se = eo.currentTarget;
        let answersNew = Object.assign({}, this.state.answers);
        answersNew[se.name] = se.value;
        this.setState({answers : answersNew});
    }

    //editForm should show previous entry

    editForm(){
        this.setState({formToComplete : true});
    }

    //render it!
  
	render(){
        let form = (<button onClick={this.editForm}>Edit form</button>), 
            feedback,
            thankyou;
            if(this.state.formToComplete){
                form = ( <Form components={this.state.questions} prefill={this.state.userAnswers} onSelect={this.onFormInput} onSubmit={this.onSubmit} cta={this.state.formCTA}/>);
            }
            if(this.state.showFeedback){
                feedback = (<Feedback/>);
            }
            if(this.state.showThanks){
                thankyou = (<Thankyou/>);
            }
		return (
			<div>
                <div className="activity">
                    {form}
                    {thankyou}
                 </div>
                    {feedback}
            </div>
		)
	}
}
export default App
