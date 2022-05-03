import { useState, useEffect } from 'react';
import './DirectoryComponent.scss';
import CardComponent from './card/CardComponent';

function DirectoryComponent({ files, setFiles, change, setChange, path, setToast }) {
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    if (orderBy === 'name') {
      setFiles([...files.sort((a, b) => a.name < b.name ? -1 : 1)]);
    } else if (orderBy === 'folder') {
      setFiles([...files.sort((a, b) => a.type > b.type ? -1 : 1)]);
    } else if (orderBy === 'files') {
      setFiles([...files.sort((a, b) => a.type < b.type ? -1 : 1)]);
    }
  }, [orderBy]);

  return (
    <div>
      <div className="select">
        <label htmlFor="select">Order by </label>
        <select name="select" onChange={(e) => setOrderBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="folder">Folder first</option>
          <option value="files">File first</option>
        </select>
      </div>

      <div className="directory_container">
        {files.map((file) => {
          return (
            <CardComponent
              type={file.type}
              name={file.name}
              change={change}
              setChange={setChange}
              path={path}
              setToast={setToast}
              key={file.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DirectoryComponent;
