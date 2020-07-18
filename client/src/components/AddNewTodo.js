import React, { Component } from 'react'

export class AddNewTodo extends Component {
    constructor (props){
        super(props)
        this.state ={
            description: ''
        }
    }

    handleChange = (event) => {
        const {id, value} = event.target
        this.setState({
            [id]: value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        this.props.handleForm({...this.state})
        this.setState({
            description:''
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='description'>New Todo</label>
                    <input type='text' value={this.state.description} onChange={this.handleChange} id='description' required />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default AddNewTodo
