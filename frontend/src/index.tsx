import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { config as dotEnvConfig } from 'dotenv';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import {Page404} from './pages/Page404';
import { Sign } from 'crypto';
import { createRoot } from 'react-dom/client';


const container : any = document.getElementById('root');
const root = createRoot(container); 
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/Login" element={<Login />} />
			<Route path="/Signup" element={<Signup />} />
			<Route path="/" element={<Home />} />
			<Route path="/404" element={<Page404 />} />
			<Route path="/*" element={<Page404 />} />
		</Routes>
	</BrowserRouter>);


