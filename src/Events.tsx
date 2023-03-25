import {Link, useLoaderData} from 'react-router-dom'
import { useState } from 'react';

function Events() {
  const events = useLoaderData() as Array<{date: string, id: string, event_title: string, description: string}>;
  const auth = localStorage.getItem('token');

  const [query, setQuery] = useState("");

  function Event(props: {date: string, id: string, event_title: string, description: string}) {
    return (
      <div className="py-2 px-8">
        <p className="text-sm font-extralight">{new Date(props.date).toLocaleDateString()}</p>
        <p className="text-xl font-medium py-2">
          <Link to={`/event/${props.id}`}>{props.event_title}</Link>
        </p>
        <p className="font-light">
          {props.description}
        </p>
      </div>
    )
  }

  function FilteredEventsList() {
    let filteredEventList = events.filter(event => event['event_title'].toLowerCase().includes(query.toLowerCase()) || event['description'].toLowerCase().includes(query.toLowerCase())).map((event:any) =>
    <Event key={event['id']} id={event['id']} date={event['date']} event_title={event['event_title']} description={event['description']}/>
    )

    return (
      <>
        {filteredEventList}
      </>
    )
  }

  function EventsList() {
    let eventList = events.map((event: any) => 
      <Event key={event['id']} id={event['id']} date={event['date']} event_title={event['event_title']} description={event['description']}/>
    )

    return(
      <>
        {eventList}
      </>
    )
  }

    return (
        <div className="container mx-auto text-white">
        <div className="flex flex-col divide-y divide-slate-400/25">
          <div className="grid grid-rows-1 grid-cols-3 sm:grid-cols-2 px-8 py-4">
            <div className="text-left sm:col-span-1">
              <span className="text-3xl py-[4.25px]">Events</span>
            </div>
            <div className="sm:self-end text-right col-span-2 sm:col-span-1 sm:ml-4">
              <input type="text" className="rounded p-2.5 bg-slate-600 text-md w-auto" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for Event" />
            </div>
          </div>
          {auth && (
          <div className="py-4 px-8">
            <div className="text-right">
              <Link to={`/event/create`} className="inline-block bg-blue-800 py-2 rounded-md p-2.5 text-base ml-8">New Event</Link>
            </div>
          </div>)}
          
          {query ? <FilteredEventsList /> : <EventsList />}
        </div>
      </div>
    )
}

export default Events