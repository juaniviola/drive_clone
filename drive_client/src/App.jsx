import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL, CLIENT_URL } from './config';
import './App.scss';
import DirectoryComponent from './components/directory/DirectoryComponent';
import PathComponent from './components/path/PathComponent';
import AddButtonComponent from './components/add_button/AddButtonComponent';
import ToastComponent from './components/toast/ToastComponent';
import { getToken, createToken } from './Token';

function App() {
  const [loading, setLoading] = useState(true);
  const [directory, setDirectory] = useState([]);
  const [change, setChange] = useState(0);
  const [path, setPath] = useState('');
  const [toast, setToast] = useState([false, '', '']);

  useEffect(() => {
    let currentPath = window.location.href;
    if (currentPath.length > CLIENT_URL.length) {
      currentPath = currentPath.substring(CLIENT_URL.length, currentPath.length);
      while (currentPath.indexOf('-') !== -1) {
        currentPath = currentPath.replace('-', '/');
      }
      setPath(currentPath);
    } else {
      currentPath = '';
    }

    const getDirectory = async () => {
      try {
        if (!getToken()) {
          await createToken(setToast);
        }

        const directory = await axios(`${SERVER_URL}/showdir?filePath=${currentPath}`, {
          headers: { 'Authorization': getToken() },
        });

        setDirectory(directory.data.map((dir) => {
          return {
            type: dir.includes('.') ? 'file' : 'folder',
            name: dir,
          };
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getDirectory();
  }, [change]);

  return (
    <div className="app_container">
      <PathComponent path={path} />

      {loading ? (
        <p>loading...</p>
      ) : (
        <DirectoryComponent
          files={directory}
          setFiles={setDirectory}
          change={change}
          setChange={setChange}
          setToast={setToast}
          path={path}
        />
      )}

      <AddButtonComponent path={path} change={change} setChange={setChange} setToast={setToast} />

      {toast[0] ? <ToastComponent type={toast[1]} message={toast[2]} /> : null}
    </div>
  );
}

export default App;
