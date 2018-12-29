## Slack Clone App (2018)

React, Redux, Firebase, Semantic-UI, React-Color, React-Avatar-Editor, Moment

## DEMO:

[testDemo Link... under development, in progress..](https://slack-clone-react-21j1fzu4z.now.sh/)

You can check it at any email
**E.G.** `123@123.123`

email confirmation will be provide later..

### QUICK BUILD

_quick built under **[https://zeit.co/](https://zeit.co/)**_

1. `npm i now`
2. create `now.json` file at the root of the project
3. put this code:

```
{
    "version": 2,
    "name": "create-react-app",
    "builds": [
        { "src": "package.json", "use": "@now/static-build" }
    ],
    "routes": [
        {"src": "^/static/(.*)", "dest": "/static/$1"},
        {"src": "^/favicon.ico", "dest": "/favicon.ico"},
        {"src": "^/asset-manifest.json", "dest": "/asset-manifest.json"},
        {"src": "^/manifest.json", "dest": "/manifest.json"},
        {"src": "^/service-worker.js", "headers": {"cache-control": "s-maxage=0"}, "dest": "/service-worker.js"},
        {"src": "^/precache-manifest.(.*)", "dest": "/precache-manifest.$1"},
        {"src": "^/(.*)", "dest": "/index.html"}
    ]
}
```

4. register at [https://zeit.co/](https://zeit.co/) under your GitHub Account
5. get your own token
6. goto `C:\Users\Admin\.now\auth.json` _uder Windows_ or `~\.now\auth.json` _under Linux_
7. put your token like this:

```
{
  "_": "This is your Now credentials file. DON'T SHARE! More: https://bit.ly/2qAK8bb",
  "token": **"YOUR TOKEN"**
}
```

8. type on console (at the root of your App) `now --public` to build and publick your react App

- to skip from 6 to 8 steps - just type on console `now -t **YOUR TOKEN**`
