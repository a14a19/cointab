import classes from "./login.module.scss";

import { useState, useContext } from "react";
import axios from "axios";
import Cointab from "../context-api/cointab";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const { BASEURL, signUp, setSignUp, signIn, setSignIn, setGetAllUser } = useContext(Cointab);

    const navigate = useNavigate();

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPwd, setSignInPwd] = useState('');
    const [signInErr, setSignInErr] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPwd, setSignUpPwd] = useState('');
    const [signUpName, setSignUpName] = useState('');
    const [signUpCPwd, setSignUpCPwd] = useState('');
    const [signUpErr, setSignUpErr] = useState('');

    const handleSingIn = () => {
        if (signInEmail && signInPwd) {
            axios.post(`${BASEURL}/login`, {
                email: signInEmail,
                password: signInPwd
            }, {
                withCredentials: true
            })
                .then(res => {
                    navigate("/home")
                    axios.get(`${BASEURL}/getall`, { withCredentials: true })
                        .then(res => {
                            setGetAllUser(res.data.message)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err.response.data);
                    setSignInErr(err.response.data);
                })
        }
    }

    const handleSignUp = () => {
        if (signUpEmail && signUpName && signUpName && signUpCPwd) {
            axios.post(`${BASEURL}/register`, {
                email: signUpEmail,
                password: signUpPwd,
                name: signUpName,
                confirmpassword: signUpCPwd
            })
                .then(res => {
                    setSignIn(true);
                    setSignUp(false);
                })
                .catch(err => {
                    console.log(err.response.data.message);
                    setSignUpErr(err.response.data.message);
                })
        }
    }

    return (
        <main className={classes.loginMain}>
            {
                signIn &&
                <section className={classes.loginSection}>
                    <h3>Sign In</h3>
                    <input type="email" onChange={(e) => setSignInEmail(e.target.value)} placeholder="Email" />
                    <input type="password" onChange={(e) => setSignInPwd(e.target.value)} placeholder="Password" />
                    {signInErr && <aside>{signInErr}</aside>}
                    <button onClick={() => handleSingIn()}>
                        Sign In
                    </button>
                    <button onClick={() => { setSignIn(false); setSignUp(true) }}>
                        Sign Up
                    </button>
                </section>
            }
            {
                signUp &&
                <section className={classes.loginSection}>
                    <h3>Sign Up</h3>
                    <input type="text" placeholder="Name" onChange={(e) => setSignUpName(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={(e) => setSignUpEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setSignUpPwd(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" onChange={(e) => setSignUpCPwd(e.target.value)} />
                    {signUpErr && <aside>{signUpErr}</aside>}
                    <button onClick={handleSignUp}>
                        Sign Up
                    </button>
                    <button onClick={() => { setSignIn(true); setSignUp(false) }}>
                        Sign In
                    </button>
                </section>
            }
        </main>
    )
}

export default Login;