import React from 'react'
import {parseCookies}  from 'nookies'
import { Admin_Verify } from 'utils/adminUrl'
import axios from 'axios'
import { Interface } from 'readline'

// Set timer constants
const cookieExpireIn = 30 * 24 * 60 * 60
const refreshTokenIn = 10 * 60 * 1000

const cookies = parseCookies().admintoken

// Set authentication context
const AuthContext = React.createContext<AuthContextProps>({
	userData: null,
	setUserData: () => {},
})

export type AuthUserData = any | null

export interface AuthContextProps {
	userData: AuthUserData
	setUserData: (dir: AuthUserData) => void
}

export interface AuthProviderProps {
	children: React.ReactNode
}

// Set authentication provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [userData, setUserData] = React.useState<AuthUserData>(null)
	const headers = {"Authorization": cookies} 
	
	React.useEffect(() => {
		if(headers.Authorization !== undefined){
			axios.get(Admin_Verify, {headers})
				.then(res => {
					setUserData(res.data)
				})
				.catch(err => {
					console.log(err)
				})
			}	
	}, [])
	// React.useEffect(() => {
	// 	// Set timer for refreshing user token
	// 	const interval = setInterval(async () => {
	// 		const user = firebaseAuth.currentUser

	// 		// Forced refresh user token
	// 		if (user) await user.getIdToken(true)
	// 	}, refreshTokenIn)

	// 	// Clear timer
	// 	return () => clearInterval(interval)
	// }, [])

	return <AuthContext.Provider value={{ userData, setUserData }}>{children}</AuthContext.Provider>
}

// Set authentication hook
export const useAuth = () => {
	return React.useContext(AuthContext)
}
