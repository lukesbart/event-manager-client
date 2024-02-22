// Core Packages
import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  json
} from "react-router-dom"

// Main Components
import App from './App'
import Credential from './Credential'

// Pages
import Index from './Index'
import Events from './Events'
import Event from './Event'
import Create from './Create'
import Delete from './Delete'
import Edit from './Edit'
import Login from './Login'
import Signout from './Signout'
import NotFound from './NotFound'
import Error from './Error'

// Router Setup
import {address} from './config';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      loader: () => {
        return localStorage.getItem('token')
      },
      id: 'auth',
      children: [
        {
          path: "/",
          element: <Index />,
        },
        {
          path: "/event/",
          element: <Events />,
          loader: async() => {
            let responseData;
            await axios.get(`${address}/event`)
            .then(function (response: any) {
              responseData = response.data;
            })
            .catch(function (response: any) {
              throw json(
                {
                  message: "Could Not Reach Server"
                },
                { status: 503 }
              )
            });
            return responseData;
          },
          errorElement: <Error />
        },
        {
          path: "/event/create",
          element: <Create />
        },
        {
          path: "/event/:id/",
          errorElement: <Error />,
          loader: async() => {
            let responseData;
            await axios.get(`${address}/event/`)
            .then(function (response: any) {
              responseData = response.data;
            })
            .catch(function (response: any) {
              if(response.code === "ERR_NETWORK") {
                throw json(
                  {
                    message: "Could not reach server",
                  },
                  {status: 503}
                )
              }
            });
            return responseData;
          },
          id: 'eventList',
          children: [
            {
              path: "/event/:id/",
              element: <Event />,
              loader: async({params}) => {
                let responseData;
                await axios.get(`${address}/event/${params.id}`)
                .then(function (response: any) {
                    responseData = response.data;
                })
                .catch(function (response: any) {
                  throw json (
                    {
                      message: response.response.data
                    },
                    {status: 404}
                  );
                });
                return responseData
              },
            },
            {
              path: "/event/:id/delete",
              element: <Delete />,
              loader: async({params}) => {
                let responseData;
                await axios.get(`${address}/event/${params.id}`)
                .then(function (response: any) {
                    responseData = response.data;
                })
                return responseData
              },
            },
            {
              path: "/event/:id/edit",
              element: <Edit />,
              loader: async({params}) => {
                let responseData;
                await axios.get(`${address}/event/${params.id}`)
                .then(function (response: any) {
                    responseData = response.data;
                })
                return responseData
              },
            }
          ]
        }, 
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/signout",
          element: <Signout />
        },
        {
          path: '/*',
          element: <NotFound />
        },
        {
          path: "/error",
          element: <Error />
        }
      ]
    }
  ]
);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Credential>
      <RouterProvider router={router} />
    </Credential>
  </React.StrictMode>,
)
