import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { config as dotEnvConfig } from 'dotenv';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Home';
import { Login } from './Login';
import { Signup } from './Signup';
import { Sign } from 'crypto';


ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/Login" element={<Login />} />
			<Route path="/Signup" element={<Signup />} />
			<Route path="/" element={<Home />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root'));


