import { useState } from 'react'
import PropTypes from 'prop-types'

const SignUpForm = ({ setToken }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const response = await fetch(
				'https://fsa-jwt-practice.herokuapp.com/signup',
				{
					method: 'POST',
					body: JSON.stringify({ username, password }),
				}
			)
			const result = await response.json()
			if (result.success) {
				console.log(result)
				console.log('success')
				setToken(result.token)
				setError(null)
			} else {
				setError(result.message)
			}
		} catch (error) {
			setError(error.message)
		}
	}

	return (
		<>
			<div className='mx-auto w-full max-w-md'>
				<h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-10 mx-auto w-full max-w-[480px]'>
				<div className='bg-white px-6 py-12 shadow rounded-lg'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor='username'
								className='block text-sm font-medium leading-6 text-gray-900'>
								username
							</label>
							<div className='mt-2'>
								<input
									id='username'
									name='username'
									type='text'
									onChange={(e) => setUsername(e.target.value)}
									className='block w-full rounded-md border-0 py-1.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-sm leading-6'
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Password
							</label>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									onChange={(e) => setPassword(e.target.value)}
									className='block w-full rounded-md border-0 py-1.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-sm leading-6'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>
								Sign in
							</button>
						</div>
						{error && (
							<div className='relative mt-10'>
								<div className='absolute inset-0 flex items-center z-10'>
									<div className='w-full border-t border-red-400' />
								</div>
								<div className='relative flex justify-center text-sm font-medium leading-6 z-20'>
									<span className='bg-white px-2 text-red-800'>
										An error has occurred
									</span>
								</div>
							</div>
						)}
					</form>
				</div>
			</div>
		</>
	)
}

export default SignUpForm

SignUpForm.propTypes = {
	setToken: PropTypes.func.isRequired,
}
