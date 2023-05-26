import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './Layout';


// // Load ENV variables
// dotEnvConfig({
// 	path:
// 		process.env.NODE_ENV === 'production'
// 			? '.env.production'
// 			: '.env.development',
// });


ReactDOM.render(
	<BrowserRouter>

		
		<Routes>
			<Route path="/" element={<Layout />} />
		
		</Routes>
	</BrowserRouter>,
	document.getElementById('root'));

function dotEnvConfig(arg0: { path: string; }) {
  throw new Error('Function not implemented.');
}
