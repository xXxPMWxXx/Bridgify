import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { config as dotEnvConfig } from 'dotenv';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './Layout';
import { Home } from './Home';

//this have issue need find out why
// // Load ENV variables
// dotEnvConfig({
// 	path:
// 		process.env.NODE_ENV === 'production'
// 			? '.env.production'
// 			: '.env.development',
// });


ReactDOM.render(
	<BrowserRouter>
		<Layout/>
		<div className='mt-n1'></div>
		<Routes>
			<Route path="/Home" element={<Home />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root'));


