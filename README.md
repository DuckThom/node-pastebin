# node-pastebin
======

## Info

Database: `./db.sqlite`

## Running

- `yarn` or `npm install`
- `yarn start` or `npm run start`
- Go to `http://localhost:3000`

## Docker

When mounting the node_modules folder, the modules do not need to be re-installed when starting a new container each time.

```
docker run -it \
	-p 3000:3000 \
	-v /path/to/node_modules:/app/node_modules \
	-v /path/to/db.sqlite:/app/db.sqlite \
	lunamoonfang/node-pastebin
```