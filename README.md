# Drive Clone

App for store and download files in homemade cloud.

## Api

> auth

POST /auth => (key) -> token (needed for all the other paths);

> files

POST /files/save => (file, filePath) -> OK; save file in filePath

GET /files/download => (query: filePath) -> File; download file stored in filePath

> folders

POST /folders/create => (path, folderName) -> OK; creates a folder called folderName in path

GET /folders/download => (query: folderPath) -> .zip; download folder zipped

> all

GET /showdir => (query: filePath) -> directory; get files and folders of path

POST /delete => (path) -> OK; deletes file or folder

## Install

```sh
yarn | node install
yarn dev | npm run dev
```

Config file of client is stored in **/drive_client/src/config.js**

Files are uploaded to **/drive_server/files** folder

## Preview

![p1](/pictures/pic%201.jpg)

![p2](/pictures/pic%202.jpg)
