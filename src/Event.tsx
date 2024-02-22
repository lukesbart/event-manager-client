import {useState, useEffect} from 'react';
import {useLoaderData, useRouteLoaderData, Link, useParams} from 'react-router-dom'
import classNames from 'classnames';
import {address} from './config';
import IEvent from './IEvent';

function Event() {
    const auth = localStorage.getItem('token');

    const events = useRouteLoaderData("eventList") as Array<IEvent>;
    const event = useLoaderData() as IEvent;
    const { id } = useParams();

    function DirLinks() {
        let eventIndx =  events.findIndex(event => event.id === parseInt(id!));

        let prev = eventIndx < events.length - 1 ? eventIndx + 1 : null;
        let prevId = prev ? events[prev]["id"] : null;

        let next = eventIndx > 0 ? eventIndx - 1 : null;
        let nextId = next != null ? events[next]["id"] : next;

        let prevBtn = prevId ? <Link to={`/event/${prevId}`} className="inline-block bg-cyan-900 rounded-md p-2.5 text-base mr-1">Prev</Link> : null;
        let nextBtn = nextId ? <Link to={`/event/${nextId}`} className="inline-block bg-cyan-600 rounded-md p-2.5 text-base ml-1">Next</Link> : null;
       
        return (
            <>
                {prevBtn}
                <Link to={`/event`} className=" inline-block bg-black rounded-md p-2.5 mx-1">All Events</Link>
                {nextBtn}
            </>
        )
    }

    const [videoActive, setVideoActive] = useState(true)

    const [videoClasses, setVideoClasses] = useState(classNames({
        'font-bold': videoActive,
        'font-light': !videoActive,
        'text-lg': true
    }))

    const [audioClasses, setAudioClasses] = useState(classNames({
        'font-bold': !videoActive,
        'font-light': videoActive,
        'text-lg': true
    }))

    function Video() {
        let videoUrl = `${address}/assets/${event["video_url"]}`

        return (
            <div className="flex items-center mx-auto">
                <video controls className="mx-auto my-4 w-11/12 h-[200px] md:w-5/6 md:h-[400px] lg:h-[500px] lg:w-7/12">
                    <source src={videoUrl} />
                </video>
            </div>
        )
    }

    function Audio() {
        let audioUrl = `${address}/assets/${event["audio_url"]}`

        return (
            <div className="mx-auto grid content-center">
                <audio src={audioUrl} controls className="mx-auto my-4 w-full md:w-1/2"></audio>
            </div>
        )
    }

    function toggleAudioVideo() {
        setVideoActive(!videoActive)
    }

    useEffect(() => {
        setVideoClasses(classNames({
            'font-bold': videoActive,
            'font-light': !videoActive,
            'text-lg': true 
        }))

        setAudioClasses(classNames({
            'font-bold': !videoActive,
            'font-light': videoActive,
            'text-lg': true 
        }))
    }, [videoActive])

    return (
        <div className="container mx-auto mt-4 md:mb-1 lg:mb-42 text-white lg:h-full">
                <h1 className="text-3xl text-center">{event['event_title']}</h1>
                <div className="text-center">
                    <span className={audioClasses} onClick={toggleAudioVideo}><button>Audio</button></span>
                    <span className="font-light">/</span>
                    <span className={videoClasses} onClick={toggleAudioVideo}><button>Video</button></span>
                </div>
                {videoActive ? <Video /> : <Audio />}
                {auth && (
                <div className="text-center">
                    <Link to={`/event/${id}/edit/`}><button className="bg-green-700 rounded-md p-2.5 text-base mr-1">Edit</button></Link>
                    <Link to={`/event/${id}/delete`}><button className="bg-red-800 rounded-md p-2.5 text-base ml-1">Delete</button></Link>
                </div>)}
                <div className="my-4">
                    <h2 className="text-2xl">Date</h2>
                    <p>{new Date(event['date']).toString()}</p>
                </div>
                <div className="my-4">
                    <h2 className="text-2xl">Description</h2>
                    <p>{event['description']}</p>
                </div>
                <div className="my-4">
                    <h2 className="text-2xl">Handout</h2>
                    <p>Link: <a href={`${address}/assets/${event["handout_url"]}`}>{event['handout_url']}</a></p>
                </div>
                <div className="text-center">
                    
                    <DirLinks />
                </div>
            </div>
    )
}

export default Event
