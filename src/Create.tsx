import {Link} from 'react-router-dom'
import {FormEvent, useState} from 'react'
import axios from 'axios'
import {address} from './config'

interface INewEvent {
    id: string, 
    event_title: string,
    date: string,
    description: string,
    audio_url: string,
    video_url: string,
    handout_url: string,
}

function Create() {

    const [errorMessage, setErrorMessage] = useState("");
    const [eventCreated, setEventCreated] = useState(false);
    const [newEvent, setNewEvent] = useState({
        id: "",
        event_title: "",
        date: "",
        description: "",
        audio_url: "",
        video_url: "",
        handout_url: ""
    });

    function handleSubmit(e: any) {
        console.log(localStorage.getItem('token'))

        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        formData.set('date', new Date(String(formData.get('date')!)).toISOString());

        // formJson['date'] = new Date(formJson['date']).toISOString();

        console.log(formData)

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson)

        axios({
            method: 'post',
            url: `${address}/event`,
            data: {
                title: formJson['title'],
                date: formJson['date'],
                description: formJson['description'],
                mp3: formJson['mp3'],
                mp4: formJson['mp4'],
                pdf: formJson['handout'] 
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'auth': localStorage.getItem('token')
            }
        })
        .then(function(response) {
            // if (response.status === 403) {
            //     setFormError("You are no longer signed in")
            // } else {
            //     setCreateResponse(response.data);
            // }
            console.log(response);
            setEventCreated(true);
            setNewEvent(response.data.data);
        })
        .catch(function(error) {
            console.log(error);
            setErrorMessage(error.response.data)
        });

    }

    return (
        <main className="text-white">
            <div className="container mx-auto my-4">
                <h1 className="text-3xl text-center mb-4">New Event</h1>
                {errorMessage && (<p className='text-rose-600 text-xl text-center'>{errorMessage}</p> )}
                {!eventCreated ? (<div className="py-2 px-8">
                    <form action="post" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 mb-4">
                            <div className="mb-2">
                                <label className="block">Title:</label>
                                <input type="text" className="bg-slate-600 py-1 px-2 rounded" name="title" />
                            </div>
                            <div className="mb-2">
                                <label className="block">Date:</label>
                                <input type="datetime-local" className="bg-slate-600 rounded py-1 px-2" name="date" />
                            </div>
                            <div className="mb-2">
                                <label className="block">Description:</label>
                                <textarea name="description" id="" className="bg-slate-600 w-full h-32 p-2 rounded"></textarea>
                            </div>
                            <div className="mb-2">
                                <label className="mr-2">MP3:</label>
                                <input type="file" name="mp3" />
                            </div>
                            <div className="mb-2">
                                <label className="mr-2">MP4:</label>
                                <input type="file" name="mp4" />
                            </div>
                            <div className="mb-2">
                                <label className="mr-2">PDF:</label>
                                <input type="file" name="pdf" />
                            </div>
                        </div>

                        <div className="text-center">
                            <Link to={`/event`}
                                className="inline-block bg-white text-black rounded-md p-2.5 text-base mr-1">Cancel</Link>
                            <button type="submit"
                                className="bg-green-700 rounded-md p-2.5 text-base ml-1">Submit</button>
                        </div>
                    </form>

                </div>) : 

                (
                <>
                <p className="text-center text-xl text-green-600">Event Successfully Created</p>
                <div className="py-2 px-8" key={newEvent['id']}>
                    <p className="text-sm font-extralight">{new Date(newEvent['date']).toLocaleDateString()}</p>
                    <p className="text-xl font-medium py-2">
                        {newEvent['event_title']}
                    </p>
                    <p className="font-light">
                        {newEvent['description']}
                    </p>
                    <p className="font-light">
                        Audio: {newEvent['audio_url']}
                    </p>
                    <p className="font-light">
                        Video: {newEvent['video_url']}
                    </p>
                    <p className="font-light">
                        PDF: {newEvent['handout_url']}
                    </p>
                </div>
                    <Link to={`/event/${newEvent['id']}`} className="text-center inline-block">Go To Event</Link>
                </>)}
            </div>
        </main> 
    )
}

export default Create