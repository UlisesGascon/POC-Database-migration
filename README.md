# POC-Database-migration
PoC Database migration

## Requirements

- Nodejs
- NPM
- Docker and Docker-compose


## Manage a Migration

1. Run environment

```bash
cd data-migration
npm run infra:start
```

_Note: All is dockerized. If you run `npm run infra:stop` all the containers will be removed as well the data (this is expected ;-))_

2. Check the applications (optional)
- New front: http://localhost:8080/ 
- New Api: http://localhost:8080/api/v1/quotes
- Legacy: http://localhost:8081/quotes/

_Note: No data in the database. So the quotes lists are not rendered (this is expected ;-))_


3. Run the seed generator

This will populate the legacy database with fake data.

```bash
cd data-migration
npm run migration:seed
```

4. Check the applications again (optional)
- New front (empty): http://localhost:8080/ 
- New Api (empty): http://localhost:8080/api/v1/quotes
- Legacy (populated) : http://localhost:8081/quotes/

5. Run the migration script

This will populate the new database with the legacy data (no fake).

```bash
cd data-migration
npm run migration:start
```

Now all the platforms (old and new) are populated

6. Run the validation script

This will run a fast DB vs DB validation and a quite long e2e tests with Cypress.

```bash
cd data-migration
npm run migration:validation
```

_Note: Check the migration logs at `/data-migration/logs`_

7. Congratulations! :tada: 

You made it!

## Run the platforms alone

Both platform are using seed fake data

### Manage the old server project

#### Start

```bash
cd old-server
npm run infra:build
npm run infra:start
```

#### Check response

Enter to `localhost:8081/quotes`

#### Stop

```bash
npm run infra:stop
```


### Manage the new server project

#### Start

```bash
cd new-server
npm run infra:build
npm run infra:start
```

#### Check response

- Enter to `localhost:8081/` for ajax render
- Enter to `localhost:8081/api/v1/quotes` for API response

#### Stop

```bash
npm run infra:stop
```