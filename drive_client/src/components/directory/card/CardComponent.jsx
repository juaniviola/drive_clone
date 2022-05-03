import { useState } from 'react';
import axios from 'axios';
import { CLIENT_URL, SERVER_URL } from '../../../config';
import './CardComponent.scss';
import { getToken } from '../../../Token';

function CardComponent ({ type, name, change, setChange, path, setToast }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const iconUrl = type === 'file' ? 'src/icons/file.svg' : 'src/icons/folder.svg';
  const downloadUrl = type === 'file' ? (
    `${SERVER_URL}/files/download?filePath=${path+'/'+name}`
  ) : (
    `${SERVER_URL}/folders/download?folderPath=${path+'/'+name}`
  );

  const handleMoveTo = () => {
    if (window.location.href === CLIENT_URL) {
      return window.location.replace(`${window.location.href}${name}`);
    }

    return window.location.replace(`${window.location.href}-${name}`);
  };

  const handleDelete = async () => {
    setToast([true, 'loading', 'Deleting...']);

    try {
      await axios.post(`${SERVER_URL}/delete`, { path: `${path}/${name}` }, {
        headers: { 'Authorization': getToken() },
      });
      setChange(change + 1);
      setToast([true, 'info', 'Deleted']);
    } catch (error) {
      setToast([true, 'warning', 'Error :(']);
      console.error(error);
    } finally {
      setTimeout(() => {
        setToast([false, '', '']);
      }, 3000);
    }
  };

  return (
    <div className="card_container">
      <img src={iconUrl} width="24" height="24" alt={type} />
      <span onClick={() => type === 'folder' ? handleMoveTo() : null}>{name}</span>
      <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src="src/icons/more.svg" width="24" height="24" alt="more" />
        {dropdownOpen ? (
          <div className="dropdown_content">
            <a href={downloadUrl} target="_blank">
              Download
              <img src="src/icons/file_download.svg" width="24" height="24" />
            </a>
            <button onClick={handleDelete}>
              Delete
              <img src="src/icons/delete.svg" width="24" height="24" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CardComponent;
