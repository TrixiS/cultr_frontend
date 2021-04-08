import React from "react";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  error() {
    if (this.state.error === 401) return; // Return redirect to login

    return <div>Error</div>;
  }

  loading() {
    return <div>Loading...</div>;
  }

  render() {
    if (this.state.error) return this.error();
    else if (!this.state.isLoaded) return this.loading();
    else return this.props.children;
  }
}
