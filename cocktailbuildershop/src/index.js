import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ItemCard from './components/context';

function Main() {
	const [bayItem, setBayItem] = useState([])

	return(
		<>
			<ItemCard.Provider value={{bayItem, setBayItem }}>
			<App />
			</ItemCard.Provider>
		</>
	)

}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Main/>)