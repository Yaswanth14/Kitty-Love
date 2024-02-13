import React from 'react';
import './Card.css';

function Card({username,rollno,description})
{
  return (
    <div className='Card'>
      <div className='upper-container'>
        <div className='image-container'>
          <img src="" alt='' width='100px' height='100px'/>
        </div>
      </div>
      <div className='lower-container'>
        <h3> { username } </h3>
        <h6> { rollno } </h6>
        <p> {description} </p>
        <button>Add</button>
      </div>
    </div>
  );
}

export default Card