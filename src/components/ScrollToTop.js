import React, { Component } from "react"
import { withRouter } from "react-router-dom"

class scrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location !== prevProps.location ||
      this.props.currentCategory !== prevProps.currentCategory
    ) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return <React.Fragment />
  }
}

export default withRouter(scrollToTop)
