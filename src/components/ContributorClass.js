import React from "react";

class ContributorClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: props.name,
        location: "India",
        xId: "@mnreddy7",
      },
    };
    console.log("ContributorClass constructor", this.props.name);
  }
  async componentDidMount() {
    console.log("ContributorClass componentDidMount", this.props.name);
    const data = await fetch("https://api.github.com/users/" + this.props.name);
    const json = await data.json();
    this.setState({
      userInfo: json,
    });
  }
  componentDidUpdate() {
    console.log("ContributorClass componentDidUpdate", this.props.name);
  }

  componentWillUnmount() {
    console.log("ContributorClass componentWillUnmount", this.props.name);
  }

  render() {
    console.log("ContributorClass render", this.props.name);
    return (
      <div className="flex border-solid border-black">
        <img
          className="w-40 rounded-2xl"
          src={this.state.userInfo.avatar_url}
        />
        <h3>
          {this.state.userInfo.name}, {this.state.userInfo.location}
        </h3>
        <h4>🦜{this.state.userInfo.login}</h4>
      </div>
    );
  }
}

export default ContributorClass;
