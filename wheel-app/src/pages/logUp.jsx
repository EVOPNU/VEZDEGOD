import React, {useState} from 'react';
import axios from "axios";

const LogUp = () => {

    let user= {
        firstName: '',
        lastName: '',
        emailAddress: ''
    }
    let setLastName, setFirstName, setEmail
    [user.lastName, setLastName] = useState('');
    [user.firstName, setFirstName] = useState('');
    [user.emailAddress, setEmail] = useState('');


    function call(){
        console.log(user)
    }
    function sendRegistration(user){
        console.log(user)
        axios.post('http://localhost:5067/api/v1/User/Login',user)
            .then(response => {
                console.log('Success')
                localStorage.setItem('token',response.data.accessToken)
            //    there should be router to main page after reg.
            })
            .catch(error => {
                alert('Ops...There`s some problem')
                console.log(error)
                console.log(user)
            })
    }

    return (
        <form>
            <h1>Регистрация</h1>
            <div>
                <h3>Фамилия</h3>
                <input onChange={event => setLastName(event.target.value)}
                       placeholder='Фамилия'
                       value={user.lastName}/>
            </div>
            <div>
                <h3>Имя</h3>
                <input onChange={event => setFirstName(event.target.value)}
                       placeholder='Имя'
                       value={user.firstName}/>
            </div>
            <div>
                <h3>Почта</h3>
                <input onChange={event => setEmail(event.target.value)}
                       placeholder='email@mail.ru'
                       value={user.emailAddress}/>
            </div>
            <button onClick={sendRegistration.bind(this,user)} type={"button"}>Зарегистрироваться</button>
        </form>
    );
};

export default LogUp;