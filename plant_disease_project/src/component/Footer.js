import React from 'react'

const Footer = (props) => {
  return (
    <>
    <div className='flex flex-col items-center text-white'>
        <img src={props.image} alt="Logo" className='w-44 h-auto mt-7'/>
        <h1 className='text-4xl font-montserrat font-semibold mb-4' >{props.name}</h1>
        <p className='w-3/4 text-wrap text-center mb-5'>{props.paragraph}</p>
        
        <div className=' border p-3 rounded-2xl  drop-shadow-3al'><a href='mailto:Aashikthapa606@gmail.com'>{props.Email}</a>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}<a href='tel:9843033468'>{props.phone}</a>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}<a href='https://www.google.com/maps/place/Pokhara/@28.229849,83.8742163,12z/data=!3m1!4b1!4m6!3m5!1s0x3995937bbf0376ff:0xf6cf823b25802164!8m2!3d28.2095831!4d83.9855674!16zL20vMDQwZHgz?entry=ttu'>{props.Address}</a></div>
        <p className='bg-black w-full text-white mt-5'>Copyright</p>
    </div>
    </>
  )
}

export default Footer