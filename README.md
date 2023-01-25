## Start the project
```
pnpm i && pnpm migrate && pnpm start
```

## Endpoints
- create a url
```
curl -i -H "Authorization: hi" -H "Content-Type:application/json" --data '{"url":"https://www.google.fr", "token":"aaad"}' -X POST localhost:8000/urls
```

- use a redirect
```
curl localhost:8000/r/aaad
```

- edit a short url
```
curl -i -H "Authorization: hi" -X PATCH -H "Content-Type:application/json" --data '{"token":"cccc"}' localhost:8000/urls/1
```

- see details of a short url
```
curl -i -H "Authorization: hi" -X GET localhost:8000/urls/1
```

- delete a short url
```
curl -i -H "Authorization: hi" -X DELETE localhost:8000/urls/1
```