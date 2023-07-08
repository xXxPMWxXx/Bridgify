import React, { useState } from 'react';
import backgroundImage from '../images/logInBackground.jpeg';
import icon from '../images/icon.png';
import {Helmet} from "react-helmet";
import './Signup.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
  
export const Signup = () => {
    let navigate = useNavigate(); 
    
    //to store the input, need set onChange on the html code also
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e: any) => {
        setPassword(e.target.value);
    }
    const handleRepassword = (e: any) => {
        setRepassword(e.target.value);
    }
    const handleName = (e: any) => {
        setName(e.target.value);
    }
    const signupHandler = async () => {
        if (password != repassword) {
            window.alert("Password unmatch!")
        }
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/signup`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "email" : email,
                "password" : password,
                "name" : name,
            })
        })
            .then(async (response) => {
                if(response.status != 200) {
                    const singupResponse = await response.json();
                    window.alert(singupResponse.message);
                }else {
                    navigate('/');
                }
               
            })
            .catch((err) => {
                window.alert(err);
            });

    }

    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol sm='6'>

                    <div className='background'>
                        <Helmet>
                            <style>
                                {'body { background-color: #FEF9F9; }'}
                            </style>
                        </Helmet>
                    </div>

                    <div className='d-flex flex-row ps-5 pt-5'>
                        <img src={icon} alt="Logo" width={35} height={35}/>
                        <span className="h1 fw-bold mb-0" style={{color:'black', fontSize:18, textAlign:'center', marginTop:7, marginLeft:7}}>Bridgify</span>
                    </div>


                    <div className='signup'>

                        <h3 style={{color:'black', fontSize:60, fontWeight:700, textAlign:'center', marginTop:80, letterSpacing:0}}>Hi there!</h3>
                        <h4 style={{textAlign:'center', color:'black', fontSize:20, marginTop:-15, fontWeight:400}}>Welcome to Bridgify</h4>

                        <MDBInput wrapperClass='mb-1 mx-5 w-75' label='Your email' id='formControlLg' type='email' size='lg' style={{marginTop: 40}} onChange={handleEmail} required/>
                        <MDBInput wrapperClass='mb-1 mx-5 w-75' label='Your name' id='formControlLg' type='text' size='lg' onChange={handleName} required/>
                        <MDBInput wrapperClass='mb-1 mx-5 w-75' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePassword} required/>
                        <MDBInput wrapperClass='mb-1 mx-5 w-75' label='Repeat your password' id='formControlLg' type='password' size="lg" onChange={handleRepassword} required/>



                        <MDBBtn className="mb-4 px-5 mx-5 w-75" size='lg' rounded color='dark' style={{marginTop: 40}} onClick={signupHandler}>Signup</MDBBtn>
                        
                    </div>

                </MDBCol>

                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <div>
                        <img src={backgroundImage}
                        alt="image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left', width: "50%", height:"100%", justifyContent: "center", }}  />
                    </div>
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

