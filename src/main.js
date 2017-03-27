import IndexPage from './IndexPage.js';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', (event)=>{
	ReactDOM.render(
		<IndexPage></IndexPage>,
		document.getElementById('main')
	);
});
