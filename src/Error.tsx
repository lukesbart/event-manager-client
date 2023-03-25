// import {useState} from 'react'
import {useRouteError} from 'react-router-dom'
// import axios from 'axios'

function Login() {

    const error = useRouteError();
    
    return (
        <main className="pt-8 flex justify-center items-center">
            <div className="container mx-auto text-white align-middle text-center">
                <h1 className="text-3xl mb-4">Error</h1>
                <p>An Error Occured Please Try Again Later</p>
                <p>Error {error.status}: {error.data.message}</p>
            </div>
        </main>
    )
}

export default Login