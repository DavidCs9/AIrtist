import React from 'react'
import { download } from '../assets'
import { downloadImage } from '../utils'

const Card = ({ _id, user, prompt, photo }) => {
  // console.log(username)
  return (
    <div id='card' className='rounded-xl relative group'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className=' group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0
      left-0 right-0 p-4 m-2 rounded-md bg-gray-800/95 '
      >
        <p className='text-white text-sm text-center border-b border-gray-400 pb-2'>{prompt}</p>
        <div className='mt-2 flex justify-between items-center gap-2'>
          <div className='text-white text-sm text-center'>
            @{user}
          </div>
          <button
            type='button'
            onClick={() => downloadImage(_id, photo)}
          >
            <img
              className='w-6 h-6 invert'
              src={download}
              alt='download'
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
