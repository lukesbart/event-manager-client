import {useState, useEffect} from 'react';
import { Link, useRouteLoaderData, useLocation } from 'react-router-dom'

function Footer() {
    // const auth = localStorage.getItem('token');
    const location = useLocation();

    const auth = useRouteLoaderData("auth");

    const [showAuth, setShowAuth] = useState(false);

    useEffect(() => {
        setShowAuth(!showAuth)
    }, [auth])

    function AuthLink() {
        let authLink = auth ? <Link to={`/signout`} className="font-extralight text-gray-600">Sign Out</Link> : <Link to={`/login`} className="font-extralight text-gray-600">Log In</Link>

       return (
       <>{authLink}</>
       )
    }

    return (
        <footer className="bottom-0 inset-x-0 mt-16 lg:mt-4 pt-4 pb-2 bg-slate-900 h-16">
            <div className="absolute mx-auto container w-full h-12 px-4">
                <div className="grid grid-cols-3 sm:grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                        <div className="grid grid-cols-1 sm:inline-block">
                            <span className="text-gray-400">Event-Manager </span>
                            <span className="text-gray-400">Luke Bartholomew 2023</span>
                        </div>
                    </div>
                    <div className="text-right col-span-1">
                        <AuthLink />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer