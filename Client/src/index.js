import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import router from './routing';


const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<RouterProvider router={router}/>
</React.StrictMode>
)