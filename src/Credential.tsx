import axios from 'axios'
import {redirect} from 'react-router-dom'
import {address} from './config'
// Verify tokens with server

import { useEffect } from 'react';

function verifyToken(token: string) {
    let valid;

    axios.post(`${address}/auth/verify`)
    .then(function(response: any) {
        valid = true;
    })
    .catch(function(response: any) {
        valid = false;
    })

    return valid;
}

export const Credential = ({children}) => {
    useEffect(() => {
        const handleTokenChange = () => {
            if(!verifyToken(localStorage.getItem('token'))) {
                localStorage.removeItem('token');
                window.location.reload();
            }
        }

        window.addEventListener('storage', handleTokenChange);
        return () => window.removeEventListener('storage', handleTokenChange);

    }, [])

    if (Date.now() > parseInt(localStorage.getItem('tokenttl'))) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenttl');
    }

    return children;
}

export default Credential