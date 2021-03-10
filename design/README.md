# Design overview of Pattr

## Summary

### Elevator Pitch

### Features

### Not Features

## Target Host Environment

### Production

- Kubernetes
- docker-hub
- [Keel](https://keel.sh/)

### Dev

- Github
- [husky lint-staged prettier](https://create-react-app.dev/docs/setting-up-your-editor/)
- Github
- docker
- npm proxy
- [Kind](https://kind.sigs.k8s.io/)
- [Skaffold](https://skaffold.dev/)

## Services

### auth

- Firebase with JWT?

### backend

- Node
- Express
- Typescript
- s3?

```shell
npx express-generator-typescript . --no-view --git
```

### database

- PostgreSQL

### object store/s3?

- [minIO?](https://min.io/)
- [Backblaze b2?](https://www.backblaze.com/b2/cloud-storage.html)

### database-api

- Hasura
  - [Hasura with Firebase JWT](https://hasura.io/blog/authentication-and-authorization-using-hasura-and-firebase/)

### frontend

- React
  - functional
  - suspend
- Create-React-App
- Typescript
- Relay
  - [Adding Relay](https://create-react-app.dev/docs/adding-relay/)
- [xstate?](https://github.com/davidkpiano/xstate)
  - [xstate hooks](https://github.com/davidkpiano/xstate/tree/master/packages/xstate-react)
- Axios?
- Jest
- Cypress
- Storybook

```shell
npx create-react-app . --template cra-template-pwa-typescript
```
