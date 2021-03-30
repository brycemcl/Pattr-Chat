## Live demo

https://pattr.chat/

## Project Description

Created by Bryce McLachlan, Jacob Allen, and Paxon Cheung.

Pattr is a channel-based instant messaging React application that allows users to create organizations with public and private conversations for each organization they are part of.

## Tech Stack

### Front-end

JavaScript, React(Create-React-App), Material-UI, Apollo Client, GraphQL, Firebase Authentication & Nginx

### Back-end

Node 12, Express, PostgreSQL, GraphQL, Hasura, Docker, & Kubernetes


## Screenshots

!["1"](/images/1.gif)
!["2"](/images/2.gif)
!["3"](/images/3.gif)
!["4"](/images/4.gif)
!["5"](/images/5.gif)
!["6"](/images/6.gif)

## Deployment 

This project is designed to be deployed in a Kubernetes cluster(Storage class and ingress required). The manifests are located in "deploy". Run `kubectl apply -k .` to deploy the manifests after changing domain and secrets in:

- ./deploy/graphql-engine-ingress.yaml
- ./deploy/pattr-frontend-ingress.yaml
- ./db.secret.env.sample
- ./deploy/db-secret-env-configmap.yaml.sample
- ./deploy/hasura-secret-env-configmap.yaml.sample
- ./hasura.secret.env.sample
- ./services/frontend/service/.env.sample

## Development Setup

This project requires Node 12 & NPM 7
Install dependencies with `npm install`.
Then run `npm run install-all`.