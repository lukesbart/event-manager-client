import {useState} from 'react'
import {Navigate} from 'react-router-dom'
import axios from 'axios'
import {address} from './config';

function Login() {
    const [loggedIn, setLoggedIn] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(e: Event) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        axios({
            method: 'post',
            url: `${address}/auth/login`,
            headers: {
                'user': String(formJson["username"]),
                'password': String(formJson["password"]),
            }
        })
        .then(function(response) {
            // console.log(response['data']);
            localStorage.setItem('token', response['data']['token']);
            localStorage.setItem('tokenttl', response['data']['ttl']);

            setLoggedIn(true);
    
        })
        .catch(function(error) {
            setErrorMessage(error.response.data);
        })
    }
    
    return (
        <main className="pt-8 flex justify-center items-center">
            <div className="container mx-auto text-white align-middle">
                <h1 className="text-center text-3xl mb-4">Log In</h1>
                {errorMessage && (<p className='text-rose-600 text-xl text-center mb-4'>{errorMessage}</p>)}
                <form action="post" onSubmit={handleSubmit}>
                    <div className="grid grid-rows-1 grid-cols-2">
                        <div className="text-right">
                            <label className="pr-4 block mb-4">Username:</label>
                            <label  className="pr-6 block mt-2">Password:</label>
                        </div>
                        <div className="text-left">
                            <input type="text" name="username" className="block mb-4 px-2 py-1 bg-slate-600 rounded" autoFocus autoCapitalize='none' />
                            <input type="password" name="password" className="block px-2 py-1 bg-slate-600 rounded" />
                        </div>
                    </div>
                    <div className="m-4 text-center">
                        <button type="submit" className="bg-sky-500/100 rounded-md p-2.5 text-base">Log In</button>
                    </div>
                </form>
            </div>
            {
                loggedIn && (
                    <Navigate to="/event" replace={true} />
                )
            }
        </main>
    )
}

export default Login