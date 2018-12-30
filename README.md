## Slack Clone App (2018)

React, Redux, Firebase, Semantic-UI, React-Color, React-Avatar-Editor, Moment, Emoji-Mart :sunglasses: :+1:

## DEMO:

[Demo-Link](https://react-slack-clone-11f80.firebaseapp.com/)

You can check it at any email
**E.G.** `123@123.123`

## DEPLOY:

Deployed with Firebase-Tools:

1. run `npm i firebase-tools -g`
2. run `firebase login`
3. run `firebase init`
4. select features to setup **E.G.** `Database: ...` && `Storage: ...`
5. select your Firebase project `your-name-firebase-project`
6. Press enter to use files (_Database_ && _Storage_) you have choosed before **E.G.** `database.rules.json` && `storage.rules`
7. run `npm run build` to build your project
8. add to `firebase.json` path to your builded project as public hosting to deploy:

```
  "hosting": {
    "public": "./build"
  }
```

9. run `firebase deploy`

### FIREBASE RULES:

- FIREBASE DATABASE RULES: look at `database.rules.json`

- FIREBASE STORAGE RULES: look at `storage.json`

## QUICK BUILD/DEPLOY with NOW:

_quick built under **[https://zeit.co/](https://zeit.co/)**_

[Link(test deploy)](https://slack-clone-react-21j1fzu4z.now.sh/)

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
  "token": "YOUR TOKEN"
}
```

8. type on console (at the root of your App) `now --public` to build and publick your react App

- to skip from 6 to 8 steps - just type on console `now -t YOUR TOKEN`
