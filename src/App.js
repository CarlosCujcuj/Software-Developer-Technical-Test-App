import './App.css'
import { requestPhotos } from './utils/requests'
import { useState } from 'react'

const App = () => {

  const [photoId, setPhotoId] = useState()
  const [photoTitle, setPhotoTitle] = useState()
  const [albumTitle, setAlbumTitle] = useState()
  const [userEmail, setUserEmail] = useState()
  const [offset, setOffset] = useState()
  const [limit, setLimit] = useState()
  const [response, setResponse] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')

  const requestData = async () => {
    setIsLoading(true)
    setErr()

    const photoFilters = {
      photoId,
      photoTitle,
      albumTitle,
      userEmail,
      offset, 
      limit
    }

    try {
      const response = await requestPhotos(photoFilters)
      setResponse(response)
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <div className='filtersBar'>
      <label>Photo Id:
          <input
            min={1}
            type="number" 
            value={photoId}
            onChange={(e) => setPhotoId(e.target.value)}
          />
        </label>
        <label>Photo Title:
          <input
            type="text" 
            value={photoTitle}
            disabled={photoId}
            onChange={(e) => setPhotoTitle(e.target.value)}
          />
        </label>
        <label>Album Title:
          <input
            type="text" 
            value={albumTitle}
            disabled={photoId}
            onChange={(e) => setAlbumTitle(e.target.value)}
          />
        </label>
        <label>User Email:
          <input
            type="text" 
            value={userEmail}
            disabled={photoId}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <label>Offset:
          <input
            type="number" 
            value={offset}
            disabled={photoId}
            onChange={(e) => setOffset(e.target.value)}
          />
        </label>
        <label>Limit:
          <input
            type="number" 
            value={limit}
            disabled={photoId}
            onChange={(e) => setLimit(e.target.value)}
          />
        </label>
        <button onClick={requestData} >Request</button>
      </div>
      <div className='result'>
        {err && <h2>{err}</h2>}
        {isLoading && <h2>Loading...</h2>}
        <div className='photosContainer'>
          {
            response.map((photo) => {
              return (
                <div className='photoItem' key={photo.id}>
                  <div className='photoContainer'>
                    <img src={photo.url} className='photoImg' alt='item' />
                  </div>
                  <p>Title: {photo.title}</p>
                  <p>Album: {photo.album.title}</p>
                  <p>User: {photo.album.user.name}</p>
                  <p>Email: {photo.album.user.email}</p>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  );
}

export default App;
