import { useState } from 'react'
import PropTypes from 'prop-types'

const Authenticate = ({ token }) => {
	const [successMessage, setSuccessMessage] = useState(null)
	const [error, setError] = useState(null)
	const [formattedIat, setFormattedIat] = useState(null)

	async function handleClick() {
		try {
			const response = await fetch(
				'https://fsa-jwt-practice.herokuapp.com/authenticate',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const result = await response.json()
			if (result.success) {
				setSuccessMessage(null)
				setError(null)
				const formatIat = new Date(result.data.iat * 1000).toLocaleTimeString(
					'en-US',
					{
						weekday: 'short',
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					}
				)
				setFormattedIat(`Token issued at: ${formatIat}`)
				console.log(formattedIat)
			} else {
				setError(result.message)
			}
			setSuccessMessage(result.message)
		} catch (error) {
			setError(error.message)
		}
	}

	return (
		<div className='mt-10 mx-auto w-full max-w-[480px] bg-white px-6 min-h-fit py-2 shadow sm:rounded-lg flex flex-col gap-4'>
			<div className='relative mt-2'>
				<div className='absolute inset-0 flex items-center z-10'>
					<div className='w-full border-t border-gray-400' />
				</div>
				<div className='relative flex justify-center text-sm font-medium leading-6 z-20'>
					<span className='bg-white px-2 text-gray-900'>
						Authenticate Token
					</span>
				</div>
			</div>
			<div>
				{successMessage && <p>{successMessage}</p>}
				{error && <p>{error}</p>}
				{formattedIat && <p>{formattedIat}</p>}
				<button
					type='submit'
					onClick={handleClick}
					className='flex w-full justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>
					Sign in
				</button>
			</div>
		</div>
	)
}

export default Authenticate

Authenticate.propTypes = {
	token: PropTypes.string,
}
