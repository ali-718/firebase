import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./config";
import * as firebase from "firebase";
import { throwStatement } from "@babel/types";

class App extends React.Component {
  state = {
    data: [],
    name: "",
    age: ""
  };

  componentDidMount() {
    // pushing data in firebase
    // firebase
    //   .database()
    //   .ref("tb_users")
    //   .child("01")
    //   .set({
    //     name: "ali haider",
    //     age: 21
    //   });
    // firebase
    //   .database()
    //   .ref("tb_users")
    //   .push({
    //     name: "Zeeshan",
    //     age: 21
    //   });
    // fetching data in firebase
    // firebase
    //   .database()
    //   .ref("tb_users")
    //   .on("child_added", snapshot => {
    //     // console.log(snapshot.val());
    //     snapshot.forEach(res => {
    //       // console.log(res.val());
    //       this.state.data.push({
    //         id: res.key,
    //         ...res.val()
    //       });
    //       // console.log(res.key);
    //       console.log(this.state);
    //     });
    //   });

    // update data
    firebase
      .database()
      .ref("tb_users")
      .child("-Lr3IVftNOEMP4ejtvq2")
      .update({ age: 22 });

    // remove data
    // firebase
    // .database()
    // .ref("tb_users")
    // .child("-Lr3IVftNOEMP4ejtvq2")
    // .remove();
  }

  Submit = e => {
    e.preventDefault();

    let isValid = false;

    firebase
      .database()
      .ref("tb_users")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(item => {
          if (item.val().name == this.state.name) {
            isValid = true;
          }
        });
      })
      .then(() => {
        if (isValid) {
          alert("duplcate name");
        } else {
          firebase
            .database()
            .ref("tb_users")
            .push({
              name: this.state.name,
              age: this.state.age
            });
        }
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.Submit(e)}>
          <input
            placeholder="name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            placeholder="age"
            onChange={e => this.setState({ age: e.target.value })}
            value={this.state.age}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
