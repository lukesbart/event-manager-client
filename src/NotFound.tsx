import { useLocation } from 'react-router-dom'

function NotFound() {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <main className='text-white flex justify-center items-center'>
            <div className='align-middle text-center'>
                <p className='text-2xl'>404: Error Not Found</p>
                <p className='text-xl'>The page: {pathName} does not exist on this server</p>
            </div> 
        </main>
    )
}

export default NotFound