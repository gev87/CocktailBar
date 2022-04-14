import React, { useEffect, useState } from "react";
import auth from "../fire";
import "firebase/compat/auth";
import { updateProfile } from "firebase/auth";
import MainContext from "../context/MainContext";




export default function Auth({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState();

	function signup(email, password, displayName) {
		if (displayName.length > 0) setName(displayName);
		return auth.createUserWithEmailAndPassword(email, password, displayName);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser?.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser?.updatePassword(password);
	}

	function updateName(name) {
		return updateProfile(auth.currentUser, {
			displayName: name,
		});
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user && name) {
				
				 user.multiFactor.user.displayName = name;
				updateProfile(auth.currentUser, {
				 displayName: name,
			 });
			}
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, [name]);
const VALUE = {
	currentUser,
	login,
	signup,
	logout,
	resetPassword,
	updateEmail,
	updatePassword,
	updateName,
};
	
	return (
		<MainContext.Provider value={VALUE}>
			{!loading && children}
		</MainContext.Provider>
	);
}
 