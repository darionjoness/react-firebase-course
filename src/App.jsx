import { useEffect, useState } from 'react'
import Auth from './components/Auth'
import { db, auth, storage } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([])

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState('')

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null)

  // Get collection you want to pass into getDocs
  const moviesCollectionRef = collection(db, 'movies')

  // GET MOVIES
   // Create getMovieList function
   const getMovieList = async () => {
    try {
      // Grab docs from db
      const data = await getDocs(moviesCollectionRef)
      // Map through data docs to get the date in the format wanted
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id
      }))
      // setMovieList state to filteredData
      setMovieList(filteredData)
    } catch (error) {
      console.error(error)
    }
  }
  
  // DELETE MOVIE
  // Create deleteMovie async function
  const deleteMovie = async (id) => {
    // Grab the movie you want to delete
    const movieDoc = doc(db, 'movies', id )
    try {
      // Run deleteDoc and pass in the movie you want to delete
      await deleteDoc(movieDoc)
    } catch (error) {
      console.error(error)
    }
    // Run getMovieList to update the list
    getMovieList()
  }

  // UPDATE MOVIE
  // Create updateMovie async function
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    try {
      await updateDoc(movieDoc, {title: updatedTitle})
    } catch (error) {
      console.error(error)
    }

    // Run getMovieLIst to update the list
    getMovieList()
  }

  // Use useEffect
  useEffect(() => {
    getMovieList()
  }, [])

  // ADD MOVIE
  // Create onSubmitMovie async function
  const onSubmitMovie = async () => {
    try {
      // Use addDoc and pass in moviesCollectionRef and the object you want to add
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      })
      getMovieList()
    } catch (error) {
      console.error(error)
    }
  }

  // Create uploadFile function
  const uploadFile = async () => {
    // Check if fileUpload is null
    if(!fileUpload) return;
    // Create file ref
    const filesFolerRef = ref(storage, `projectFiles/${fileUpload.name}`)
    // Upload files
    try {
      await uploadBytes(filesFolerRef, fileUpload)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className="App">
      <Auth />
      <div>
        <input 
        type="text" 
        placeholder='Movie title...' 
        onChange={(e) => setNewMovieTitle(e.target.value)} 
        />
        <input 
        type="number" 
        placeholder='Release Date...' 
        onChange={(e) => setNewReleaseDate(Number(e.target.value))} 
        />
        <input 
        type="checkbox" 
        checked={isNewMovieOscar} 
        onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label htmlFor="">Received an Oscar?</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{color: movie.receivedAnOscar ? 'green' : 'red'}}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            
            <input 
            type="text" 
            placeholder='New Title...' 
            onChange={(e) => setUpdatedTitle(e.target.value)} 
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
          <input 
          type="file" 
          onChange={(e) => setFileUpload(e.target.files[0])} 
          />
          <button onClick={uploadFile}>Upload File</button>
      </div>

    </div>
  )
}

export default App
