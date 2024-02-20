import React from 'react'
import { useState } from 'react'

const FilterComponent = ({Check,SetCheck,ApplyFilter}) => {


  return (
    <div className='bg-white min-h-44 w-64 rounded-xl shadow-lg flex'>
        <div className='h-full w-full flex flex-col m-auto px-2 py-3 gap-3 text-lg font-semibold '>
            <div className='flex flex-row items-center'>
                <input type="checkbox" id='checkbox1' checked={Check==='checkbox1'} onChange={()=>SetCheck('checkbox1')} className=' h-4 w-4  mr-2 hover:cursor-pointer focus:text-blue-400' />
                <label htmlFor="checkbox1">Less Than 1000</label>
            </div>
            <div className='flex flex-row items-center'>             
                <input type="checkbox" id='checkbox2' checked={Check==='checkbox2'} onChange={()=>SetCheck('checkbox2')} className=' h-4 w-4 outline-none  mr-2 hover:cursor-pointer ' />
                <label htmlFor="checkbox2">1000{"<"}Greater Than{"<"}2000</label>
            </div>
            <div className='flex flex-row items-center'>
                <input type="checkbox" id='checkbox3' checked={Check==='checkbox3'} onChange={()=>SetCheck('checkbox3')} className='h-4 w-4 outline-none border border-blue-500 mr-2 hover:cursor-pointer' />
                <label htmlFor="checkbox3">Greater Than 2000</label>
            </div>
            <div className='flex  flex-row gap-2 justify-center'>
                <button className='h-fit px-3 py-1 rounded-lg text-lg border border-red-400 text-red-500' onClick={()=>SetCheck('')}>
                    Clear
                </button>
                <button className='h-fit px-3 py-1 rounded-lg text-lg border border-violet-800 text-violet-700 hover:bg-violet-800 hover:text-white'
                onClick={()=>ApplyFilter(Check)}
                >
                    Apply
                </button>
            </div>
        </div>
    </div>
  )
}

export default FilterComponent