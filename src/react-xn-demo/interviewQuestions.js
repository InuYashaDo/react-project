import React, { Component } from "react";
import styles from "./index.less";

class interviewQuestions extends Component {
  render() {
    return (
      <div className={styles.interviewQuestions}>
        <div className="parent">
          这是父元素
          <div className="block">这是block元素</div>
          <span className="inline">这是inline元素</span>
        </div>
      </div>
    );
  }
}

export default interviewQuestions;
