import React, { Component } from 'react'

export class TodoCard extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.todo.description}</h1>
                <h2 onClick={()=> this.props.deleteTodo(this.props.todo._id, this.props.index)}>X</h2>
            </div>
        )
    }
}

export default TodoCard
