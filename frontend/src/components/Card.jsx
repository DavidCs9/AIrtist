import React from 'react'

import { download } from '../assets'
import { downloadImage } from '../utils'

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className='rounded-xl relative group'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className=' group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0
      left-0 right-0 p-4 m-2 rounded-md bg-gray-900'
      >
        <p className='text-white text-sm text-center'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='text-white text-sm text-center'>
            {name}
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
