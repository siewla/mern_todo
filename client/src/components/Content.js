import React, { Component } from 'react'
import TodoCard from './TodoCard'
import AddNewTodo from './AddNewTodo'

export class Content extends Component {
    constructor (props){
        super(props)
        this.state = {
            description : '',
            todos: []
        }
    }

    fetchTodos = async ()=> {
        try{
            const response = await fetch ('/todos')
            const data = await response.json()
            this.setState({
                todos: data
            })
        } catch (error){
            console.log(error)
        }
    }

    handleForm = (newData) =>{
        fetch('/todos', {
            body: JSON.stringify({ description: newData.description }),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(createdToDo => {
                return createdToDo.json()
            })
            .then(jsonedToDo => {
                this.setState({
                    description: '',
                    todos: [...this.state.todos, jsonedToDo]
                })
            })
            .catch(error => console.log(error))
    }

    deleteTodo = (id, index) =>{
        fetch('/todos/'+ id, {
            method: 'DELETE'
        }).then(() => {
            fetch('/todos')
                .then(response => response.json())
                .then(todos => {
                    this.setState({ todos: todos })
                });
        })
    }   

    componentDidMount (){
        this.fetchTodos();
    }


    render() {
        return (
            <div>
                <AddNewTodo handleForm = {this.handleForm} />
                {this.state.todos.reverse().map((todo, index) =>{
                    return (
                        <TodoCard 
                            key={todo._id} 
                            index={index} 
                            todo={todo} 
                            deleteTodo={this.deleteTodo} 
                        />
                    )
                })}
            </div>
        )
    }
}

export default Content
