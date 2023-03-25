import {useState} from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import axios from 'axios'
import {address} from './config';

function Edit() {
    const event = useLoaderData();
    const { id } = useParams();

    console.log(event)

    function dateToLocalTime(date: string) {
        let newDate = new Date(date);
        let localeDateTime = newDate.toISOString().split('T')[0];
        let localTime = newDate.toLocaleTimeString();
        let min = ':' + localTime.split(' ')[0].split(':')[1]
    
        if (localTime.split(' ')[1] ==' PM') {
            let hour = parseInt(localTime.split(' ')[0].split(':')[0]);
            localeDateTime = localeDateTime.concat(String(hour), 'T' + String(hour+12) + min);
        } else {
            let hour = parseInt(localTime.split(' ')[0].split(':')[0]);
            if (hour < 12) {
                localeDateTime = localeDateTime.concat('T' + String(hour).padStart(2, '0') + min)
            } else {
                localeDateTime = localeDateTime.concat('T'+ '00' + min)
            }
        }
    
        return localeDateTime;
    }

    let date = dateToLocalTime(event['date']);

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("");

    function handleSubmit(e: Event) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        formData.set('date', new Date(formData.get('date')).toISOString());
    
        const formJson = Object.fromEntries(formData.entries());

        axios({
            method: 'patch',
            url: `${address}/event/${id}`,
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
            console.log(response);
            setSuccessMessage("Event Successfully Updated")
        })
    }

    return (
        <main className="text-white">
        <div className="container mx-auto my-4">
            <h1 className="text-3xl text-center mb-4">Edit Event: {event['event_title']}</h1>
            <p className='text-rose-600 text-xl text-center'>{errorMessage}</p>
            <p className='text-green-500 text-xl text-center'>{successMessage}</p>
            <div className="py-2 px-8">
                <form action="post" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 mb-4">
                        <div className="mb-2">
                            <label className="block" htmlFor="title">Title:</label>
                            <input id="title" type="text" className="bg-slate-600 py-1 px-2 rounded" defaultValue={event['event_title']} name="title" />
                        </div>
                        <div className="mb-2">
                            <label className="block" htmlFor="date">Date:</label>
                            <input type="datetime-local" className="bg-slate-600 rounded py-1 px-2"
                                defaultValue={date} name="date" id="date" />
                        </div>
                        <div className="mb-2">
                            <label className="block" htmlFor="description">Description:</label>
                            <textarea name="description" id="description"
                                className="bg-slate-600 w-full h-32 p-2 rounded" defaultValue={event['description']}></textarea>
                        </div>
                        <div className="mb-2">
                            <label className="mr-2">MP3:</label>
                            <input type="file" name="mp3" accept='audio/mpeg' />
                            <p>{event['audio_url']}</p>
                        </div>
                        <div className="mb-2">
                            <label className="mr-2">MP4:</label>
                            <input type="file" name="mp4" accept='video/mp4' />
                            <p>{event['video_url']}</p>
                        </div>
                        <div className="mb-2">
                            <label className="mr-2">PDF:</label>
                            <input type="file" name="handout" accept='application/pdf' />
                            <p>{event['handout_url']}</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to={`/event/${id}`}
                            className="inline-block bg-white text-black rounded-md p-2.5 text-base mr-1">{!successMessage ? 'Cancel' : 'Go To Event'}</Link>
                        <button type="submit"
                            className="inline-block bg-yellow-500 rounded-md p-2.5 text-base ml-1">Submit</button>
                    </div>
                </form>

            </div>
        </div>
    </main>
    )
}

export default Edit