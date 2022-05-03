import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../config';
import './AddButton.scss';
import { getToken } from '../../Token';

function AddButtonComponent({ path, change, setChange, setToast }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAddFolder = async (e) => {
    e.preventDefault();

    const folderName = prompt('Type name of new folder');
    if (!folderName) return;

    setToast([true, 'loading', 'Creating...']);

    try {
      await axios.post(`${SERVER_URL}/folders/create`, { path, folderName }, {
        headers: { 'Authorization': getToken() },
      });
      setChange(change + 1);
      setToast([true, 'info', 'Created']);
    } catch (error) {
      setToast([true, 'warning', 'Error :(']);
      console.error(error);
    } finally {
      setTimeout(() => {
        setToast([false, '', '']);
      }, 3000);
    }
  };

  const handleAddFile = async (e) => {
    e.preventDefault();

    const app = document.getElementById('root');
    const newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.style.opacity = 0;
    newInput.id = 'input_file';

    app.appendChild(newInput);
    const input = document.getElementById('input_file');
    input.onchange = async () => {
      setToast([true, 'loading', 'Uploading...']);

      try {
        const formData = new FormData();
        formData.append('file', input.files[0]);
        formData.append('filePath', path);

        await axios.post(`${SERVER_URL}/files/save`, formData, {
          headers: { 'Authorization': getToken() },
        });
        setChange(change + 1);
        setToast([true, 'info', 'Uploaded']);
      } catch (error) {
        setToast([true, 'warning', 'Error :(']);
        console.error(error);
      } finally {
        setTimeout(() => {
          setToast([false, '', '']);
        }, 3000);
      }

      input.remove();
    };

    input.click();
  };

  return (
    <div className="add_button">
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img
          src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"
          width="40"
          height="40"
          alt="action"
        />
        {dropdownOpen ? (
          <div className="dropdown_content">
            <a href="#" onClick={(e) => handleAddFolder(e)}>
              Create folder
              <img src="src/icons/create_new_folder.svg" width="24" height="24" />
            </a>

            <a href="#" onClick={(e) => handleAddFile(e)}>
              Upload file
              <img src="src/icons/upload_file.svg" width="24" height="24" />
            </a>
          </div>
        ) : null}
      </button>
    </div>
  );
}

export default AddButtonComponent;