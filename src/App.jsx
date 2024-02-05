import { useState } from 'react'

import './App.css'
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

function App() {
	const [token, setToken] = useState(null)

	return (
		<main className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 min-w-60'>
			<SignUpForm token={token} setToken={setToken} />
			<Authenticate token={token} setToken={setToken} />
		</main>
	)
}

export default App
