import React, { useState } from 'react';
import backgroundImage from './images/logInBackground.jpeg';
import icon from './images/icon.png';
import {Helmet} from "react-helmet";
import './Login.css';
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
  
export const Login = () => {
    let navigate = useNavigate(); 
    
    //to store the input, need set onChange on the html code also
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState(null);

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e: any) => {
        setPassword(e.target.value);
    }
    const loginHandler = async () => {
        // //calling backend API
        fetch(`${process.env.REACT_APP_BACKEND_PRODUCTION_URL}/user/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "email" : email,
                "password" : password,
            })
        })
            .then(async (response) => {
                const loginResponse = await response.json();
                const data = loginResponse.data;
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
                console.log(data.accessToken);
                navigate('/Home');
                if (!response.ok) {
                    console.log(response);
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


                    <div className='logIn'>

                        <h3 style={{color:'black', fontSize:60, fontWeight:700, textAlign:'center', marginTop:80, letterSpacing:0}}>Hi there!</h3>
                        <h4 style={{textAlign:'center', color:'black', fontSize:20, marginTop:-15, fontWeight:400}}>Welcome to Bridgify</h4>

                        <MDBInput wrapperClass='mb-3 mx-5 w-75' label='Your email' id='formControlLg' type='email' size='lg' style={{marginTop: 40}} onChange={handleEmail} required/>
                        <MDBInput wrapperClass='mb-1 mx-5 w-75' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePassword} required/>


                        <p className="small mb-4 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
                        <MDBBtn className="mb-4 px-5 mx-5 w-75" size='lg' rounded color='dark' onClick={loginHandler}>Login</MDBBtn>
                        <p className='ms-5'>Don't have an account? <a href="#!" className="link-info">Sign Up</a></p>


                    </div>

                </MDBCol>

                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <div>
                        <img src={backgroundImage}
                        alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left', width: "50%", height:"100%", justifyContent: "center", }}  />
                        <p style={{color:'white' ,position:'absolute', left:1300, top:58, fontSize:13, fontWeight:500}}>SIGN UP</p>
                        <MDBBtn rounded outline color='light'style={{position:'absolute', left:1370, top:50}}>Admin</MDBBtn>
                    </div>
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

