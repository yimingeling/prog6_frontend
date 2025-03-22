import {createBrowserRouter, RouterProvider} from 'react-router';
// import je components
import './App.css'
import NotesCreate from "./pages/NotesCreate.jsx";
import Home from './pages/Home.jsx'

import Layout from './components/Layout.jsx';
import NotesList from "./pages/NotesList.jsx";
import List from "./pages/People.jsx";


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
                element: <NotesCreate/>,
            },

            {
                path: '/notes',
                element: <NotesList/>,
            },
            {
                path: '/people',
                element: <List/>,
            },
        ]
    }
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;