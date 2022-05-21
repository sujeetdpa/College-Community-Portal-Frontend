import React from 'react'
import Navbar from '../components/Navbar'

export default function Error() {
  return (
    <div>
        <Navbar/>
        <div className='text-center'>
            <h1>404 Not Found</h1>
            <p>Thre is no mapping for {window.location.pathname}</p>
        </div>
    </div>
  )
}
