import React from 'react'

import './ErrorBoundary.scss'

const Fallback = () => {
  const handleButtonClick = () => {
    window.location.href = '/proposals'
  }

  return (
    <div className={'fallback-body'}>
      <h2 className={'fallback-title'}>
        Oops, something went wrong, please try to reload or go to{' '}
        {/* <CustomButton
          style={{ margin: '0 auto' }}
          className={'fallback-home-button'}
          onClick={handleButtonClick}
        >
          Home Page
        </CustomButton> */}
      </h2>
      <div className='gears'>
        <div className='gear one'>
          <div className='bar' />
          <div className='bar' />
          <div className='bar' />
        </div>
        <div className='gear two'>
          <div className='bar' />
          <div className='bar' />
          <div className='bar' />
        </div>
        <div className='gear three'>
          <div className='bar' />
          <div className='bar' />
          <div className='bar' />
        </div>
      </div>
    </div>
  )
}

export default Fallback
