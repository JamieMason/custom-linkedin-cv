# linkedin-json

## Setup

### Register an Application with LinkedIn

Visit developer.linkedin.com and follow the [Add New Application](https://www.linkedin.com/secure/developer?newapp=) procedure.

After you've done that you'll be given some OAuth Keys labelled;

+ API Key
+ Secret Key
+ OAuth User Token
+ OAuth User Secret

### Install

```bash
git clone https://github.com/JamieMason/import-linkedin-profile.git
cd import-linkedin-profile
npm install
```

### Setup Heroku

See: [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) and be sure to install the [Heroku Toolbelt](https://toolbelt.heroku.com/).

```bash
heroku login
heroku plugins:install git://github.com/ddollar/heroku-config.git
```

### Submit API Keys to Heroku

Create a file called `.env` in the root of the repo which contains your LinkedIn API keys.

```bash
API_KEY=xxxxxxxxxxxx
SECRET_KEY=xxxxxxxxxxxxxxxx
OAUTH_USER_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
OAUTH_USER_SECRET=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
SALT=anything-you-like
SESSION_SECRET=anything-you-like
```

These will be available to you in Node as eg. `process.env.API_KEY`.

Send those values to Heroku with the following command.

```bash
heroku config:push
```

### Deploy

```bash
heroku create
git push heroku master
```

## Usage

### Start an instance

```bash
heroku ps:scale web=1
```

### Inspect an instance

```bash
heroku ps
```

### View it in a web browser

```bash
heroku open
```

## UI

A simple link will show which takes you to LinkedIn to authorise your Application. Once you've granted it access you'll be redirected back where you should be presented with a textarea containing your full profile as JSON.
