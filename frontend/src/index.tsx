import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { config as dotEnvConfig } from 'dotenv';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Health } from './pages/Health';
import { Help } from './pages/Help';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Message } from './pages/Message';
import { Page404 } from './pages/Page404';
import { Profile } from './pages/Profile';
import { Setting } from './pages/Setting';
import { Signup } from './pages/Signup';
import { Sign } from 'crypto';
import { createRoot } from 'react-dom/client';


const container: any = document.getElementById('root');
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/Health" element={<Health />} />
			<Route path="/Help" element={<Help />} />
			<Route path="/" element={<Home />} />
			<Route path="/Login" element={<Login />} />
			<Route path="/Message" element={<Message />} />
			<Route path="/404" element={<Page404 />} />
			<Route path="/Profile" element={<Profile />} />
			<Route path="/Setting" element={<Setting />} />
			<Route path="/Signup" element={<Signup />} />
			<Route path="/*" element={<Page404 />} />
		</Routes>
	</BrowserRouter>);


