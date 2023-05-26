import { ReactElement, useContext } from 'react';
import './App.css';
import { AuthContext } from './context/AuthContext';
import NotAuthorized from './pages/Error/NotAuthorized';
import NotFound from './pages/Error/NotFound';
import FileList from './pages/file-list/FileList';
import Signup from './pages/signup/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import MusicListing from './pages/music-list/MusicListing';
interface Props {
  children: ReactElement;
}

function App() {
  const {currentUser} = useContext(AuthContext)
  const RequireAuth: React.FC<Props> = ({ children }) => {
    return currentUser ? children : <>error</>;
  };

  return ( 
    <Router>
    <div className='wrapper'>
     <div className='header'>
     <Header/>
     </div> 
 
      <div className='sidebar'>
          <LeftMenu />
      </div>
      <div className='main'>
             
              <Routes>
                <Route element={currentUser ? 
                   <FileList /> : 
                   <Signup />} path={'/'} />

                <Route element={
                <RequireAuth>
                <FileList />
                </RequireAuth>
                } path={'/user/:userId/fileList'} />

                <Route element={
                <RequireAuth>
                <MusicListing />
                </RequireAuth>
                } path={'/user/:userId/music'} />

                <Route path='*' element={<NotFound />}/>
                <Route path="landing" element={<NotAuthorized />} />

                
            </Routes> 
            
      </div>
    </div>  
 </Router> 
  );
}

export default App;
