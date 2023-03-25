import {useEffect, useState} from 'react'
import {Link, Navigate} from 'react-router-dom'

function Signout() {
    const [loggedOut, setLoggedOut] = useState(false)

    localStorage.removeItem('token');
    localStorage.removeItem('tokenttl')

    useEffect(() => {
        setTimeout(() => {
            setLoggedOut(true)
          }, 2000);
    }, [])

    return (
        <main className="flex justify-center items-center">
            <div className="container mx-auto text-white">
                <h1 className="text-center text-3xl mb-4">Successfully Signed Out</h1>
                <div className="m-4 text-center">
                    <Link to={`/`} className="inline-block bg-sky-500/100 rounded-md p-2.5 text-base">Back to main page</Link>
                </div>
            </div>
            {
                loggedOut && (
                    <Navigate to="/" replace={true} />
                )
            }
        </main>
    )
}

export default Signout