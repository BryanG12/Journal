import React from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es'; // cambio de idioma
import { activeNotes } from '../../actions/notes';

export const JournalEntry = ({id,date,title,body,url}) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleEntryClick = () => {
    const note = {
      date,
      title,
      body,
      url
    }
    dispatch(activeNotes(id,note))
  }

  return (
    <div 
      className='journal__entry pointer'
      onClick={handleEntryClick}
    >

    { 
      url &&
      <div 
        className='journal__entry-picture'
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${url})`
        }}
      >
      </div>
    }

      <div className='journal__entry-body'>
        
        <p className='journal__entry-title'>
          {title}
        </p>

        <p className='journal__entry-content'>
          {body}
        </p>
      
      </div>

      <div className='journal__entry-date-box v-line'>
        <span> { noteDate.format('dddd','es') } </span>
        <h4> { noteDate.format('D','es')} </h4>
      </div>

    </div>
  )
}
