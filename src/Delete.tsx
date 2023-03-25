import {useState} from 'react'
import {Link, useLoaderData, useParams} from 'react-router-dom'
import axios from 'axios'
import {address} from './config'
import IEvent from './IEvent'

function Delete() {
    const event = useLoaderData() as IEvent;
    const { id } = useParams();
    const [eventDeleted, setEventDeleted] = useState(false);

    function handleSubmit() {
        axios({
            method: 'delete',
            url: `${address}/event/${id}`,
            headers: {
                'auth': localStorage.getItem('token')
            }
        })
        .then(function(response) {
            setEventDeleted(true);
            console.log(response);
        })
    }

    return (
        <main className="container mx-auto my-4 text-white">
            <h1 className="text-3xl text-center mb-4">Delete Event: {event["event_title"]}</h1>
            {!eventDeleted ? (<><p className="text-center text-lg">Are you sure you want to delete this event?</p>
            <div className="py-2 px-8">
                <p className="">{event["date"]}</p>
                <p className="text-xl font-medium py-2"><a href="event.html">{event["event_title"]}</a></p>
                <p className="">{event["description"]}</p>
                <p>Video: {event["video_url"]}</p>
                <p>Audio: {event["audio_url"]}</p>
                <p>Handout: {event["handout_url"]}</p>
            </div>
            <div className="text-center">
                <Link to={`/event/${id}`} className="mr-1"><button className="bg-white text-black rounded-md p-2.5 text-base">Cancel</button></Link>
                <button className="bg-red-800 rounded-md p-2.5 text-base ml-1" onClick={handleSubmit}>Delete</button>
            </div></>) : 
            (<div className='text-center'>
            <p className="text-lg">Event: {event["event_title"]} Deleted.</p>
            <Link to={`/event`} className="text-md inline-block bg-sky-600 text-white rounded-md p-2.5 text-base ml-2">Return to Events</Link>
            </div>)}
        </main>
    )
}

export default Delete