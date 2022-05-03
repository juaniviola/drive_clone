import { useState } from 'react';
import { SERVER_URL, CLIENT_URL } from '../../config';
import './pathComponent.scss';

function PathComponent({ path }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleGoBack = () => {
    let copyPath = path;
    while (copyPath.indexOf('/') !== -1) {
      copyPath = copyPath.replace('/', '-');
    }

    // the back path is home
    if (copyPath.indexOf('-') === -1) {
      return window.location.replace(CLIENT_URL);
    }

    // get index of last "-"
    let indexPath = copyPath.length - 1;
    while (copyPath[indexPath] !== '-') {
      indexPath -= 1;
    }

    const newUrl = `${CLIENT_URL}${copyPath.substring(0, indexPath)}`;
    console.log(newUrl);
    window.location.replace(newUrl);
  };

  return (
    <div className="app_path">
      {path !== '' ? (
        <div className="go_back">
          <button onClick={handleGoBack}>⬅</button>
        </div>
      ) : null}
      <b>{'My unity > '}</b>
      <span>{path}</span>
      <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src="src/icons/more.svg" width="24" height="24" alt="more" />
        {dropdownOpen ? (
          <div className="dropdown_content">
            <a href={`${SERVER_URL}/folders/download?folderPath=${path}`} target="_blank">
              Download folder
              <img src="src/icons/file_download.svg" width="24" height="24" />
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PathComponent;
