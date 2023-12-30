import Contributor from "./Contributor";
import ContributorClass from "./ContributorClass";
import React from "react";

class About extends React.Component {
    constructor(props){
        super(props);
        console.log('About constructor');
    }
  render() {
    console.log('About render');
    return (
      <div className="contributor-card">
        <h1>About Us class</h1>
        {/* <Contributor name="Naveen1  🇮🇳" location="@mnreddy7" /> */}
        <ContributorClass name="naveen-kumar-reddy-murthi"/>
        <ContributorClass name="akshaymarch7" />
      </div>
    );
  }
  componentDidMount(){
    console.log('About componentDidMount')
  }
  componentDidUpdate(){
    console.log('About componentDidUpdate')
  } 

  componentWillUnmount(){
    console.log('About componentWillUnmount')
  }

// sequence of execution of different lifecycle methods.  
// About constructor
// About.js:11 About render
// ContributorClass.js:15 ContributorClass constructor naveen-kumar-reddy-murthi
// ContributorClass.js:36 ContributorClass render naveen-kumar-reddy-murthi
// ContributorClass.js:15 ContributorClass constructor akshaymarch7
// ContributorClass.js:36 ContributorClass render akshaymarch7
// ContributorClass.js:18 ContributorClass componentDidMount naveen-kumar-reddy-murthi
// ContributorClass.js:18 ContributorClass componentDidMount akshaymarch7
// About.js:22 About componentDidMount
// ContributorClass.js:36 ContributorClass render naveen-kumar-reddy-murthi
// ContributorClass.js:36 ContributorClass render akshaymarch7
// ContributorClass.js:26 ContributorClass componentDidUpdate naveen-kumar-reddy-murthi
// ContributorClass.js:26 ContributorClass componentDidUpdate akshaymarch7

}

export default About;
