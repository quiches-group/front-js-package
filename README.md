# Filer Server Module

[![npm](https://img.shields.io/npm/v/@maxencemottard/file-server-module?style=for-the-badge)](https://www.npmjs.com/package/@maxencemottard/file-server-module)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/MaxenceMottard/file-server-module/actions?style=for-the-badge)

## Description

This package is used to connect and upload files to my file server. To be able to use this service,
it is necessary to make me a request for a token. It is also possible to install the file server
on your machine but the package is not yet public.


## Documentation

### 1- Installation

Using npm:
````bash
$ npm install @maxencemottard/file-server-module --save
````

Using yarn:
````bash
$ yarn add @maxencemottard/file-server-module
````

### 2- Examples

**Instantiate class**

```js
import FileServer from '@maxencemottard/file-server-module';

const FILE_SERVER_API_KEY = 'MY_API_KEY';
const fileServer = new FileServer({ apiKey: FILE_SERVER_API_KEY });
```

**Instantiate class if you use you own server**

```js
import FileServer from '@maxencemottard/file-server-module';

const FILE_SERVER_API_KEY = 'MY_API_KEY';
const FILE_SERVER_HOSTNAME = "https://domain.com"
const fileServer = new FileServer({ apiKey: FILE_SERVER_API_KEY, hostname: FILE_SERVER_HOSTNAME });
```



**⚠️ If you want to upload an image uploaded from your API with express, I recommend using the [express-fileupload](https://www.npmjs.com/package/express-fileupload) package. ⚠️**

**Upload a file from express-fileupload**

```js
import { UploadedFile } from 'express-fileupload';

async function uploadFile(uploadedFile: UploadedFile) {
  try {
    const fileurl = await fileServer.uploadFileToServerFromExpressFileUpload(uploadedFile);
  } catch (e) {
    consolle.log(e);
  }
}
```

**Upload a file stored on your machine.**

```js
async function uploadFile(filePath: string) {
  try {
    const fileurl = await fileServer.uploadFileToServer(uploadedFile);
  } catch (e) {
    consolle.log(e);
  }
}
```

