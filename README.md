#READ ME, PLEASE.

## Setting up the project

run `npm install` then `npm start` and you are ready to go.

## Web-Genie Architecture

- This app is based on Create-React-App Template. for more info please have a look [here](./wiki/create-react-app.md)
- We use Azure SSO for Authentication
- Local storage and session storage and used to persist user data.

#### Folder Structure

- `services` a Service is a self-contained module where you will define the core business logic of your application. This can eventually be shared between several scenes or even applications, such as a web and native version of you app.
- `pages` is a component that could contain fetching data and/or business logic.
- `components` contains the ui-components.
- `redux` containers redux actions and reducers (reducer files also include the selectors).
- `helpers` contains utils functions and classes.
- `config` contains config for api and all third-party libraries.

## Coding Standards

We follow Airbnb javascript coding standards, Linting tools are use to enforce these guidelines.

#### Naming convention

We follow these naming guidelines

- https://github.com/kettanaito/naming-cheatsheet

#### Styling

We use SCSS & CSS BLISS. Please read the guidelines before start coding.

- https://github.com/gilbox/css-bliss
- https://github.com/airbnb/css

#### Javascript

We use ES6, React, Redux. Please read the guidelines before start coding.

- https://github.com/airbnb/javascript
- https://github.com/airbnb/javascript/tree/master/react

#### Testing

@todo

**References**

- https://www.fullstackreact.com/p/using-presentational-and-container-components-with-redux/
- https://github.com/facebook/create-react-app

### New Components Structure 

Every new component must follow the following structure:
 
```
/ComponentName/
    index.ts
    ComponentName.tsx
    ComponentName.styles.tsx
    ComponentName.types.ts
    ComponentName.stories.tsx [CSF format only!]
    _ComponentName.scss [perfer styled-components]
    /tests/ComponentName.test.tsx
```

### Browser Support
The project no longer supports IE11 and MS Edge 16 and lower. The current supported browsers are MS Edge 17+ , Chrome, Safari, Firefox.


### Generating Valid SSL Certificate 
1. Install https://github.com/FiloSottile/mkcert ( make sure to run mkcert -install after) (useful link: https://donatstudios.com/Local-Certificate-On-macOS-Apache).
2. run `npm run generate-cert` 
3. copy these settings to your local env file:
```
SSL_CRT_FILE=localhost.pem
SSL_KEY_FILE=localhost-key.pem
```
