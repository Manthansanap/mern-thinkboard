import{ useEffect, useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import RateLimitedUi from '../components/RateLimitedUi.jsx';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);  
      }
      catch(error){
        if(error.response?.status === 429){
          console.log("Too many request.");
          setIsRateLimited(true);
        }
        else{
          toast.error("Failed to load notes.")
        }
      }finally{
        setLoading(false);
      }
    }

    fetchNotes();
  },[])

  return (
  <div className='min-h-screen'>
    <NavBar />
    {isRateLimited && <RateLimitedUi />}

    <div className="max-w-7xl mx-auto p-4 mt-6 space-y-6">
      {loading && (
        <div className='text-center text-primary py-10'>
          Loading...
        </div>
      )}

      {notes.leng === 0 && !isRateLimited && <NotesNotFound/>}

      {notes.length > 0 && !isRateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map(note => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
export default HomePage;