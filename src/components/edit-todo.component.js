import React, { Component } from 'react';
import axios from 'axios';
import TaskHolder from './task-input-holder';
export default class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_tasks: [],

        }
    }

    componentDidMount() {
        axios.get('https://mentortodo.herokuapp.com/todos/' + this.props.match.params.id)
            .then(res => {
                console.log("Res data-> ", res.data)
                this.setState({
                    todo_description: res.data.todo_description,
                    todo_responsible: res.data.todo_responsible,
                    todo_tasks: res.data.todo_tasks,

                })
            })
            .catch(err => console.log(err));
    }

    onChangeTodoDescription = (e) => {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible = (e) => {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    updateTasks = (tasks) => {
        this.setState({
            todo_tasks: tasks
        });
    }


    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_tasks: this.state.todo_tasks,

        };
        console.log("Updated Todo -> ", obj)
        axios.post('https://mentortodo.herokuapp.com/todos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Mentor Detail</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        required/>
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}
                       required />
                    </div>
                    <div className="form-group">
                        <label>Task: </label>
                        <TaskHolder tasks={this.state.todo_tasks} updateTasks={this.updateTasks} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Mentor Details" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}