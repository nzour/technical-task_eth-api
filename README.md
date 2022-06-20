<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h2>
    <p align="center"> 
        Technical task
    </p>
</h2>

#### Integration with Ethereum Network through Web3

- Node v16.15.0
- NestJs
- TypeOrm
- PostgreSQL

---

#### Setup
- Install dependencies: `yarn install` or `npm i`
- Run docker container with PostgreSQL: `docker-compose up -d --build`
- Migrate database: `yarn typeorm migrations:run` or `./node_modules/.bin/typeorm migration:run`
- Set env variable ETH_RPC_URL with your secret key
- Run dev server via: `yarn start` or `npm run start`
