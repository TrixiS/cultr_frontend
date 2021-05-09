import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    return this.state.error === null
      ? this.props.children
      : this.props.onError(this.state.error) ?? this.props.children;
  }
}
