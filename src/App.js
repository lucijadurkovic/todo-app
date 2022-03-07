import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: "",
      list: [],
    };
  }

  addTask() {
    const newTask = {
      id: Math.random() + 1,
      value: this.state.newTask,
      completed: false,
    };
    const list = [...this.state.list];
    list.push(newTask);
    this.setState({ list: list, newTask: "" });
  }

  completeTask(id) {
    const list = [...this.state.list];
    //const completedTask = list.filter((task) => task.id === id);
    //completedTask.completed = true; //radi ali se ne ne rendera opet
    this.setState({
      list: list.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        }
        return task;
      }),
    });
  }

  deleteTask(id) {
    const list = [...this.state.list];
    const updatedList = list.filter((task) => task.id !== id);

    this.setState({ list: updatedList });
  }

  FakeClick(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementsByClassName("addTask")[0].click();
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>Add an Item:</h1>
          <br></br>
          <input
            type="text"
            placeholder="Add item here..."
            value={this.state.newTask}
            onChange={(e) => this.setState({ newTask: e.target.value })}
            onKeyUp={(e) => this.FakeClick(e)}
          ></input>
          <button
            type="submit"
            className="addTask"
            onClick={() => this.addTask()}
          >
            Add
          </button>
          <br />
          <ul>
            {this.state.list.map((task) => {
              return (
                <li
                  key={task.id}
                  className={task.completed ? "completed" : "uncompleted"}
                >
                  {task.value}

                  <button
                    className="completeTask"
                    onClick={() => this.completeTask(task.id)}
                  >
                    &#10004;
                  </button>
                  <button
                    className="deleteTask"
                    onClick={() => this.deleteTask(task.id)}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
