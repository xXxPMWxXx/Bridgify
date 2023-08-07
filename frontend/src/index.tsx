import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { config as dotEnvConfig } from 'dotenv';
import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from 'react-dom/client';
//for normal user
import { Health } from './pages/Health';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Page404 } from './pages/Page404';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Signup } from './pages/Signup';
import { Forbidden } from './pages/Forbidden';
//for admin user
import { Elderly_admin } from './pages/Elderly(admin)';
import { Home_admin } from './pages/Home(admin)';
import { Post_admin } from './pages/Post(admin)';
import { Record_admin } from './pages/Record(admin)';



const container: any = document.getElementById('root');
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/Health" element={<Health />} />
			<Route path="/Home" element={<Home />} />
			<Route path="/" element={<Navigate to="/Home" />} />
			<Route path="/Login" element={<Login />} />
			<Route path="/404" element={<Page404 />} />
			<Route path="/Profile" element={<Profile />} />
			<Route path="/About" element={<About />} />
			<Route path="/Signup" element={<Signup />} />
			<Route path="/Forbidden" element={<Forbidden />} />
			<Route path="/*" element={<Page404 />} />
			<Route path="/Home-admin" element={<Home_admin />} />
			<Route path="/Elderly-admin" element={<Elderly_admin />} />
			<Route path="/Post-admin" element={<Post_admin />} />
			<Route path="/Record-admin" element={<Record_admin/>} />
		</Routes>
	</BrowserRouter>);


