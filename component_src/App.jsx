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
            formToComplete : true,
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
            answers: {},  
            databaseRequest: '',
        };

        //populate answers object and dynamic part of database request string with the questions here
        this.state.answers = this.dynamicResults(this.state.questions, 'obj');
        this.state.databaseRequest = this.dynamicResults(this.state.questions, 'str');

        
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
                return 'testUrssss';
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
                    console.log(img);
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
        // whichWhere = (this.state.private ? 'userID="'+this.state.userID+'" AND ' : ''),
        //request = 'SELECT userID,'+dr+' FROM '+this.state.id+' WHERE '+whichWhere+'instanceID="'+this.state.instance+'"',

        // you are trying to do 2 sql requests in one, the union below brings back one result so needs equal amount of queries. You need one call but two questions. 

        request = 'SELECT '+dr+' FROM '+this.state.id+' WHERE instanceID="'+this.state.instance+'" UNION ALL SELECT userID, example_1, example_2 FROM '+this.state.id+' WHERE userID="'+this.state.userID+'" AND instanceID="'+this.state.instance+'"',
        sql = encodeURI(request);      
        fetch('https://ib-ed.tech/api/exercise/'+sql)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((results) => {
                console.log(results);
                // if(results.length > 0){
                //     this.setState({formToComplete: false})
                //     this.setState({showFeedback: true});
                //     this.setState({answers: results[0]});
                // }
            });
    }

    getRequest(request){

    }

    //update answers when form is interacted with

    onFormInput(eo){
        let se = eo.currentTarget;
        let answersNew = Object.assign({}, this.state.answers);
        answersNew[se.name] = se.value;
        this.setState({answers : answersNew});
    }

    //render it!
  
	render(){
        let form, 
            feedback,
            thankyou;
            if(this.state.formToComplete){
                form = ( <Form components={this.state.questions} onSelect={this.onFormInput} onSubmit={this.onSubmit}/>);
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
