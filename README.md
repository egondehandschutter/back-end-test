# back-end-test

- name: Egon Dehandschutter
- E-mailadres: <mailto:egon.dehandschutter@gmail.com>

## requirements

I expect that the following software is already installed:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## startup

- Install all dependencies:

```bash
yarn install
```

- start application:

```bash
yarn start
```

- make a `.env` with the following information and add it to your configuration:

```dotenv
NODE_ENV=development
```

## Testing

- test the application with yarn test:

```bash
yarn test
```

- make a `.env.test` with the following information and add it to your configuration:
 ```dotenv
NODE_ENV=test
```

## Extra info
- the application is made in visual studio code.
- the 2 api endpoints are: http://localhost:9000/api/persons, http://localhost:9000/api/persons/:name
- persistent-node-cache used as cache solution
