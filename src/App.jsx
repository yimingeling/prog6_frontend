import {createBrowserRouter, RouterProvider} from 'react-router';
// import je components
import './App.css'
import SetupsCreate from "./pages/setupsCreate.jsx";
import Home from './pages/Home.jsx'

import Layout from './components/Layout.jsx';
import SetupsList from "./pages/SetupsList.jsx";
import SetupsDetails from "./pages/setupsDetails.jsx";
import List from "./pages/People.jsx";
import React from "react";
import SetupsEdit from "./pages/setupsEdit.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/create',
                element: <SetupsCreate/>,
            },

            {
                path: '/setups',
                element: <SetupsList/>,
            },
            {
                path: '/setups/:id/edit',
                element: <SetupsEdit/>,
            },
            {
                path: '/setups/:id',
                element: <SetupsDetails/>,
            },
            {
                path: '/people',
                element: <List/>,
            },
            {
                path: '*',
                element: <PageNotFound/>,
            },
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;