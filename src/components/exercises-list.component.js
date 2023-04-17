import React, {Component} from 'react';
import axios from 'axios';
import { Link, useParams} from 'react-router-dom';



const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id} state={{id: props.exercise._id}}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )
  

export default class ExerciseList extends Component{

    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state= {
            exercises: [],
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/exercises/").then(
           res => {
                this.setState({exercises: res.data})    
            }
        ).catch(err=>console.log("Error: ", err))
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res=>alert(`${res.data}`)).catch(err=>console.log("Error: ", err));
        this.state({exercises: this.state.exercises.filter(el => el.id!==id)});
    }
    exerciseList(){
        return(this.state.exercises.map(currentExercise=>{
            return(
                <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>
            )
        }))
    }
    render(){

        console.log("Exercise list component loaded")
        return(
            <div>
            <h3>Logged Exercises</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.exerciseList() }
              </tbody>
            </table>
          </div>
        )
    }
}