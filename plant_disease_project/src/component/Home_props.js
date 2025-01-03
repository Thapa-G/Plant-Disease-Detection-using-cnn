// import React from 'react'

// const Home_props = (props) => {
//   return (
//     <div className='flex pt-5 flex-col justify-around items-center '>
//         <div className=' flex'><img src={props.image} alt='propic' className='w-32 h-32 rounded-full '/></div>
//         <div className='mb-14 pl-3'>
//             <p className='text-wrap w-max font-medium'>{props.head}</p>
//             <p className='text-sm w-32'>{props.content}</p>
//         </div>
//     </div>
//   )
// }

// export default Home_props

import React from 'react';

const Home_props = (props) => {
  const { image, head, content, className } = props;

  return (
    <div className={`flex pt-5  justify-around items-center ${className}`}>
      <div className='flex'>
        <img 
          src={image} 
          alt='propic' 
          className='w-32 h-32 rounded-full' 
        />
      </div>
      <div className='mb-14 pl-3'>
        <p className='text-wrap w-max font-medium'>{head}</p>
        <p className='text-sm w-32'>{content}</p>
      </div>
    </div>
  );
};

export default Home_props;
