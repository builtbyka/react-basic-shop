import React from 'react';
import Feedback from './feedback/feedback.jsx';
import Form from './form/form.jsx';
import Error from './feedback/error.jsx';
import Success from './feedback/success.jsx';
import Activity from './activities/activity.jsx';

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
            closeTheForm: false,
            formToComplete : true,
            formCTA: 'Submit',
            errorMessage : false,
            showResult : false,
            showFeedback : false,
            showThanks : false,
            successMessage : false,
            loader: false,
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
                  'Example 4 question' : {
                    type : 'slider', 
                    name : 'example_4',
                    options: [0, 5, 0]     // min, max, starting val     
                 },
            }, 
            userAnswers: {},
            answers: {},  
            databaseRequest: '',
        };

        //populate answers object and dynamic part of database request string with the questions here
        this.state.userAnswers = this.dynamicResults(this.state.questions, 'obj');
        //start user answers object, but if certain type of input put in default value
        this.state.databaseRequest = this.dynamicResults(this.state.questions, 'str');

        this.editForm = this.editForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.onFormInput = this.onFormInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
	}

    // uses the questions to create a dynamic string 

    dynamicResults(q, type){
        let counter, ans = {};
        if(type === 'str') ans = '';
        for(var key in q){ 
            if(type === 'str'){
                ans += q[key].name +',';
            }else{
                let val = '',
                arr = [];
                switch(q[key].type) {
                    case 'dropdown':
                        arr = q[key].options;
                        val = arr[0];
                        break;
                    case 'slider':
                   	    arr = q[key].options;
                        val = arr[2];
                        break;
                }
                ans[q[key].name] = val;
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
                return 'testUr1';
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
        answeredRequest = 'SELECT '+dr+' FROM '+this.state.id+' WHERE userID="'+this.state.userID+'" AND instanceID="'+this.state.instance+'" ORDER BY TimeStampUTC DESC LIMIT 1';
        this.getRequest(answeredRequest, 'answered');
        if(!this.state.private){
            let pubRequest = 'SELECT '+dr+' FROM '+this.state.id+' JOIN (SELECT MAX(timeStampUTC) MAXTIME, userID FROM  '+this.state.id+' WHERE userID!="'+this.state.userID+'" GROUP BY USERID) LATEST ON  '+this.state.id+'.timeStampUTC=LATEST.MAXTIME and  '+this.state.id+'.userID=LATEST.userID LIMIT 50';
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
                    this.setState({formToComplete: false, showResult: true, showFeedback: true, userAnswers: results[0], formCTA: 'Resubmit'});
                }else{
                    this.setState({answers: results});
                }            
            });
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
                        this.setState({successMessage:true, formToComplete:false, showResult:false});
                        this.setState({loader: true});
                        // let that = this;
                        // setTimeout(function(){that.setState({loader: false, showResult: true}); }, 800);

                    }else{
                        this.setState({errorMessage:true});
                    }
                }
            )
    }

    //render it!
  
	render(){
        let form = (<button onClick={this.editForm}>Edit form</button>), 
            error,
            success,
            activity,
            feedback,
            loader;
            if(this.state.errorMessage){
                error = (<Error/>);
            }
            if(this.state.successMessage){
                success = (<Success/>);
            }
            if(this.state.formToComplete){
                form = ( <Form components={this.state.questions} prefill={this.state.userAnswers} onSelect={this.onFormInput} onSubmit={this.onSubmit} closeTheForm={this.state.closeTheForm} closeForm={this.closeForm} cta={this.state.formCTA}/>);
            }
            if(this.state.showResult){
                activity = (<Activity/>);
            }
            if(this.state.loader){
                loader = <div className="loader">Loading...</div>;
            }

            if(this.state.showFeedback){
                feedback = (<Feedback/>);
            }
		return (
			<div>
                <div className="activity">
                    {error}
                    {success}
                    {form}
                    {loader}
                    {activity}
                 </div>
                    {feedback}
            </div>
		)
	}
}
export default App
