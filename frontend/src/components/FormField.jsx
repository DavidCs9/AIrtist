import React from 'react'
import { motion } from 'framer-motion'

const FormField = ({ name, labelName, type, value, handleChange, isSurpriseMe, handleSurpriseMe, placeholder }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
    >
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className=' text-sm font-medium text-[#D8D8D8]'
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-xs  py-1 px-2 rounded-md bg-purple-900 hover:bg-opacity-60 '
          >
            Sorprendeme
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className=' p-2 border-2 w-full rounded-md  outline-none text-black font-medium'
      />
    </motion.div>
  )
}

export default FormField
