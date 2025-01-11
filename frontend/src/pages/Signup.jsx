import React, { useState } from 'react'
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom"
import BottomWarning from "../components/BottomWarning";
import axios from 'axios';


function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    return (
    <div className='bg-[#212120] h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-81 text-center p-2 h-max px-4'>
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your infromation to create an account"}  />
                <InputBox label={"First Name"} placeholder={"John"} onChange={(e) => {
                    setFirstName(e.target.value);
                }}  />
                <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e) => {
                    setLastName(e.target.value);
                }}  />
                <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} onChange={(e) => {
                    setUsername(e.target.value);
                }}  />
                <InputBox label={"password"} placeholder={"*********"} onChange={(e) => {
                    setPassword(e.target.value);
                }}  />
                <div className='pt-5'>
                    <Button label={"Sign Up"} onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            password,
                            firstName,
                            lastName,
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} />
                </div>
                <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"} />
            </div>
        </div>
    </div>
  )
}

export default Signup
