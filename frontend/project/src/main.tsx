// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { createBrowserRouter, RouterProvider } from 'react-router'
// import HomePage from './page/HomePage.tsx'
// import AboutPage from './page/AboutPage.tsx'
// import { QueryClient, QueryClientProvider } from 'react-query'


// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<App/>,
//     children:[
//       {
//         path:'/',
//         element:<HomePage/>
//       },
//       {
//         path:'/about',
//         element:<AboutPage/>
//       },
//     ]

//   },
//   {}
// ])

// const queryClient = new QueryClient()

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>

//    <RouterProvider router={router}/>
//     </QueryClientProvider>
//   </StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);