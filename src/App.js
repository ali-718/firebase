import React, { Component } from "react";
import "./config";
import * as f from "firebase";
import { isTSEnumMember } from "@babel/types";

export default class App extends Component {
  state = {
    users: []
  };

  // name = {name:ali}
  // age = {age:21}
  // data = {...this.name,...this.age}

  componentDidMount() {
    // f.database()
    //   .ref("users")
    //   .push({
    //     name: "sumaim",
    //     age: 21
    //   });

    f.database()
      .ref("users")
      .on("value", res => {
        // console.log(res.val());
        res.forEach(item => {
          this.state.users.push({ id: item.key, ...item.val() });
          // console.log(item.key);
          // console.log(item.val());
        });
      });
  }

  render() {
    return (
      <div>
        <h1>firebase</h1>
        {console.log(this.state)}
      </div>
    );
  }
}
