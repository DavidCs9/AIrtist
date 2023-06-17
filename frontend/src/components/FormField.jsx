import React from 'react'

const FormField = ({ name, labelName, type, value, handleChange, isSurpriseMe, handleSurpriseMe, placeholder }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className=' text-sm font-medium text-gray-900'
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#E5E5E5] py-1 px-2 rounded-md text-black'
          >
            Surprise Me
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
        className='bg-[#E5E5E5] p-2 border-2 w-full rounded-md text-black outline-none'
      />
    </div>
  )
}

export default FormField
