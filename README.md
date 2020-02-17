# POC-Database-migration
PoC Database migration

## Requirements

- Nodejs
- NPM
- Docker and Docker-compose

## Manage the old server project

### Start

```bash
cd old-server
npm run infra:build
npm run infra:start
```

### Check response

Enter to `localhost:8081/quotes`

### Stop

```bash
npm run infra:stop
```


## Manage the new server project

### Start

```bash
cd new-server
npm run infra:build
npm run infra:start
```

### Check response

- Enter to `localhost:8081/` for ajax render
- Enter to `localhost:8081/api/v1/quotes` for API response

### Stop

```bash
npm run infra:stop
```