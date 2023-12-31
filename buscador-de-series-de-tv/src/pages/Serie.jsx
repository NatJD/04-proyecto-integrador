import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Seasons from '../components/Seasons'
import Cast from '../components/Cast'

const Serie = () => {
  const [seri, setSeri] = useState({})
  const serieId = useParams().id

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${serieId}`)
      .then((response) => response.json())
      .then((serie) => {
        setSeri(serie)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [serieId])

  const removeTags = (html) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  return (
    <div>
      <h1 className='title-h1'>{seri.name}</h1>
      <div className='serie-info clearfix'>
        <img className='serie-pelicula-image' src={seri.image?.medium} alt={seri.name} />
        <div className='serie-description'>
          <p className='text-description'>
            {seri.summary ? removeTags(seri.summary) : 'No hay descripción disponible'}
          </p>
          <p className='serie-status'>Status:{seri.status}</p>
          <p className='serie-language'>Language:{seri.language}</p>
        </div>
      </div>

      <div className='seasons-container'>
        <h2 className='title-h2'>SEASONS:</h2>
        <Seasons serieId={serieId} />
      </div>

      <div className='cast-container'>
        <h2 className='title-h2'>CAST:</h2>
        <Cast serieId={serieId} />
      </div>
    </div>
  )
}

export default Serie
