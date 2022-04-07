import React from 'react'

export const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>

      <div 
        className='journal__entry-picture'
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)'
        }}
      >
      </div>

      <div className='journal__entry-body'>
        
        <p className='journal__entry-title'>
          una nuena noche
        </p>

        <p className='journal__entry-content'>
          Aute ullamco id et veniam incididunt commodo enim.
        </p>
      
      </div>

      <div className='journal__entry-date-box'>
        <span>Jueves</span>
        <h4>31</h4>
      </div>

    </div>
  )
}
