import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom'

function Header() {
    const location = useLocation()
    const auth = localStorage.getItem('token');

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
    }, [location])

    function toggleMenu() {
        setMenuOpen(!menuOpen)
    }
    
    const links = [
        {title: 'Events', link: '/event'},
    ]

    if (auth) {
        links.push({title: 'New Event', link: '/event/create'})
        links.push({title: 'Sign Out', link: '/signout'})
    } else {
        links.push({title: 'Login', link: '/login'})
    }

    function DropdownNav() {
        let link_map = links.map((link) => 
            <li className='pt-2 pb-2'>
                <Link to={link.link} className="text-xl">{link.title}</Link>
            </li> 
        )

        return (
            <div className="background-blur sm:hidden absolute z-50" x-show="open" x-transition>
                <div className="w-screen text-center bg-slate-900 py-4">         
                    <ul className="flex flex-col divide-y divide-slate-400/25 text-white">
                        {link_map}
                    </ul>
                </div>
            </div>
        )
    }

    function NavbarLinks() {
        let link_map = links.map((link, index) => 
            <span className='max-sm:hidden pl-6' key={index}>
                <Link to={link.link}>{link.title}</Link>
            </span>
        )
        return (
            <>
                {link_map}
            </>
        )
    }

    return (
        <header>
            <nav className="z-10 bg-slate-900 pb-4">
                <div className="pt-4 container mx-auto">
                    <div className="grid grid-rows-1 grid-flow-row-dense grid-cols-2">
                        <div className="text-white col-span-1 font-light text-2xl">
                            <Link to={`/`}>Event Manager</Link>
                        </div>
                        <div className="text-white col-span-1 text-right">
                            <span className="sm:hidden mr-4">
                                <a href="#">
                                    <i className="bi-list text-3xl" onClick={toggleMenu}></i>
                                </a>
                            </span>
                            <NavbarLinks />
                        </div>
                    </div>
                </div>
                {menuOpen && (<DropdownNav />)}
            </nav>
        </header>
    )
}

export default Header