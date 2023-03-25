import {Link} from 'react-router-dom'

function Index() {
    return (
      <div className="h-full sm:h-screen mb-20 lg:mb-0">
                <div className="h-3/6 sm:h-5/6 md:h-5/6 bg-cover bg-no-repeat flex items-center"
                    style={{backgroundImage: "url('/src/assets/headway-F2KRf_QfCqw-unsplash.jpg')"}}>
                    <div className="container mx-auto pl-3">
                        <div className="">
                            <h1 className="text-cyan-50 align-middle text-xl backdrop-blur-[1px]">An Event-Manager Webapp
                                for
                                Small Events
                            </h1>
                            <Link to={`/event`}
                                className="bg-sky-500/100 text-white rounded-md p-2.5 mt-5 text-base inline-block">View
                                Events</Link>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto max-md:px-4 pb-6">
                    <p className="text-white text-xl mt-4">About Event Manager</p>
                    <p className="text-white text-base">Event Manager is a personal project written with an Express.JS
                        backend,
                        and a React Front End. The UI is built with Tailwind CSS. The navigation within the client side
                        is
                        built with React Router. Authentication for the app is provided by a combination of HTTP Local
                        Authentication
                        and JSON Web Tokens. This app allows an event manager to create different meetings for an event
                        with
                        file
                        uploads
                        including MP3, MP4, and PDF assets.</p>
                </div>
            </div>
    )
}

export default Index