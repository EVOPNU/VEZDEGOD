import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LogIn = () => {

    let user={
        lastName:'',
        emailAddress:''
    }
    let setLastName, setEmail
    [user.lastName,setLastName] = useState('');
    [user.emailAddress, setEmail] = useState('');
    const [checked, setChecked] = useState(false);

    const router = useNavigate()

    function login(user){
        axios.post('http://localhost:5067/api/v1/User/Login',user)
            .then(response => {
                console.log('Success')
                console.log(response.data)
                if(checked) {
                    localStorage.setItem('token', response.data.accessToken)
                } else {sessionStorage.setItem('token',response.data.accessToken)}
                //    there should be router to main page after reg.
                router('/profile')


            })
            .catch(error => {
                alert('Ops...There`s some problem')
                console.log(error)
                // console.log(user)
            })
    }

    function changeChecked(){
        setChecked(!checked)
    }

    return (
        <div className='innerBox'>
                <form className='inputInner logInInnner'>
                <h1>Авторизация</h1>
                <div>
                    <h3>Фамилия</h3>
                    <input onChange={event => setLastName(event.target.value)}
                           placeholder='Фамилия'
                           value={user.lastName}
                           className='logIn'/>
                </div>
                <div>
                    <h3>Почта</h3>
                    <input onChange={event => setEmail(event.target.value)}
                           placeholder='email@mail.ru'
                           value={user.emailAddress}/>
                </div>
                <div>
                    <input type="checkbox" checked={checked} onChange={changeChecked}/>
                    <label>Запомнить меня</label>
                </div>
                <button className='logIn' onClick={login.bind(this,user)} type={"button"}>Авторизоваться</button>
            </form>
        </div>
    );
};

export default LogIn;