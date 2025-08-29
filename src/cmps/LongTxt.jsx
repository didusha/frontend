import { useState } from 'react'

export function LongTxt({ txt, length = 100 }) {
  const isLongerThanLimit = txt.length > length
  const textToShow = !isLongerThanLimit ? txt : txt.substring(0, length) + '...'
  
  return (
    <section className='long-txt'>
      <p className='txt'>
        {textToShow.charAt(0).toUpperCase() + textToShow.slice(1).toLowerCase()}
      </p>
      {isLongerThanLimit && (
        <div>
          <button className='show-txt-btn'>Show more</button>
        </div>
      )}
    </section>
  )
}
