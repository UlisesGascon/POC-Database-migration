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