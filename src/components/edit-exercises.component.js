import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from 'react-router-dom';

export default function EditExercise (props){
 
    const location = useLocation();
    console.log("Value of Id is : ", location.state.id);
    console.log("Typeof : ",typeof(location.state.id))
    const [state, setState] = useState({
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    })

  useEffect(()=> {
    axios.get('http://localhost:5000/exercises/'+ location.state.id)
      .then(response => {
        setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setState(prev=>{
            return({...prev,
            users: response.data.map(user => user.username),})
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      console.log("After useEffect is Called!")

  },[])

  console.log("Users: " , state.users)

  function onChangeUsername(e) {
    setState(prev=>{
      return({...prev,username: e.target.value})
    })
  }

  function onChangeDescription(e) {
    setState(prev=>{
      return({...prev, description: e.target.value})
    })
  }

   function onChangeDuration(e) {
     setState(prev=>{
      return({...prev,duration: e.target.value})
    })
  }

   function onChangeDate(date) {
    setState(prev=>{
      return({...prev,date: date})
    })
  }

  function onSubmit(e) {
     e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date
    }

    console.log("EXercise:  ",exercise);

    axios.post('http://localhost:5000/exercises/update/' + location.state.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }
    
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
              required
              className="form-control"
              value={state.username}
              onChange={onChangeUsername}>
              {
               state.users ? state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}
                    >{user}
                    </option>;
                }): null
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={state.description}
              onChange={onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={state.duration}
              onChange={onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={state.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
