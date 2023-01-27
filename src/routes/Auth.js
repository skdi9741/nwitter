import { 
    getAuth, 
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    const auth = getAuth();

    const onChange = (event) => {
        const { 
            target: { name, value },
        } = event;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const { 
            target: { name }
        } = event;
        let provider;
        if(name === 'google'){
            provider = new GoogleAuthProvider();
        } else if(name ==='github') {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(auth, provider);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name='email'
                    type='email' 
                    placeholder='Email' 
                    required 
                    value={email}
                    onChange={onChange}
                />
                <input 
                    name='password'
                    type='password' 
                    placeholder='Password' 
                    required 
                    value={password}
                    onChange={onChange}
                />
                {error}
                <input type='submit' value={newAccount ? 'Create Account' : 'Log in'} />
            </form>
            <span onClick={toggleAccount}>{newAccount ? 'Log in.' : 'Create Account'}</span>
            <div>
                <button 
                    onClick={onSocialClick} 
                    name='google'
                >
                    Continue with Google
                </button>
                <button 
                    onClick={onSocialClick} 
                    name='github'
                >
                    Continue with Github
                </button>
            </div>
        </div>
    );
}

export default Auth;