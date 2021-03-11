# Filer Server Module

[![npm](https://img.shields.io/npm/v/@quiches/front?style=for-the-badge)](https://www.npmjs.com/package/@quiches/front)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/quiches-group/front-js-package/deploy?style=for-the-badge)

## Description

This package is used to connect and upload files to my file server. To be able to use this service,
it is necessary to make me a request for a token. It is also possible to install the file server
on your machine but the package is not yet public.


## Documentation

### 1- Installation

Using npm:
````bash
$ npm install @quiches/front --save
````

Using yarn:
````bash
$ yarn add @quiches/front
````

### 2- Examples

**Usage**

The public key is generated on the dashboard at : https://dashboard.quiches.ovh.

```js
import QuichesStack from '@quiches/front';

const PUBLIC_KEY = 'pub_xxxxx';
const quiches = QuichesStack(PUBLIC_KEY);
const auth = quiches.auth;

// or
import { Authentication } from '@quiches/front';

const PUBLIC_KEY = 'pub_xxxxx';
const auth = new Authentication(PUBLIC_KEY);
```


### 3- Authentication
The Authentication class has 3 available methods.

#### 1- Login
This method has 2 parameters which are `mail` and `password`, they are of type string.

It returns a promise.

````js
const auth = quiches.auth;

const mail = 'user@domain.ext';
const password = 'passxx';

auth.login({ mail: mail, password: password })
  .then(() => console.log('success'))
  .catch(() => console.log('error'))
````

#### 2- Register
This method has 4 parameters which are `mail`, `password`, `firstname` and `lastanme`, they are of type string.

It returns a promise.

````js
const auth = quiches.auth;

const mail = 'user@domain.ext';
const password = 'passxx';
const firstname = 'John';
const lastname = 'Doe';

auth.register({ mail: mail, password: password, firstname: firstname, lastname: lastname })
  .then(() => console.log('success'))
  .catch(() => console.log('error'))
````

#### 3- Get JWT Token
If you need to retrieve the JWT token to make requests to your API, there is a method to retrieve this token.

If you need to retrieve the JWT token to make requests to your API, there is a method to retrieve this token.

````js
const auth = quiches.auth;

auth.getToken({ mail: mail, password: password })
  .then((token) => console.log(token))
  .catch(() => console.log('error'))
````
