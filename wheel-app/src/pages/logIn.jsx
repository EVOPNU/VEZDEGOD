import React, {useState} from 'react';
import axios from "axios";

const LogIn = () => {

    let user={
        lastName:'',
        emailAddress:''
    }
    let setLastName, setEmail
    [user.lastName,setLastName] = useState('');
    [user.emailAddress, setEmail] = useState('');

    function login(user){
        axios.post('',user)
            .then(response => {
                console.log('Success')
                console.log(response.data)
                localStorage.setItem('token',response.data.accessToken)
                //    there should be router to main page after reg.
            })
            .catch(error => {
                alert('Ops...There`s some problem')
                console.log(error)
                // console.log(user)
            })
    }
    return (
        <form>
            <h1>Авторизация</h1>
            <div>
                <h3>Фамилия</h3>
                <input onChange={event => setLastName(event.target.value)}
                       placeholder='Фамилия'
                       value={user.lastName}/>
            </div>
            <div>
                <h3>Почта</h3>
                <input onChange={event => setEmail(event.target.value)}
                       placeholder='email@mail.ru'
                       value={user.emailAddress}/>
            </div>
            <button onClick={login.bind(this,user)} type={"button"}>Авторизоваться</button>
        </form>
    );
};

export default LogIn;