# custom-linkedin-cv

At the time of writing, this project is a basic working prototype which is only a few hours old.

I treat my LinkedIn profile as a living Résumé, but sometimes I'm asked to format this information in a more traditional way.

Doing this is a _real chore involving a lot of copy and paste and manual formatting — so I created this in an effort to lighten the load a little.

## Current behaviour

* Embed the LinkedIn JavaScript API.
* Prompt user to authorise this application access to your LinkedIn profile data.
* Fetch LinkedIn profile as JSON.
* Use AngularJS to display the profile as a very basic HTML Document.

## Known issues

* Your authenticated session with LinkedIn is not currently persisted between full-page reloads. _(I think this may be because I've only run it over http  rather than https so far, LinkedIn's docs mention this)_.

## TODO

* Stabilising, refactoring, unit tests.
* Finish the default theme.
* Implement a convenient way for the community to contribute custom designs. _(Ideally via something like `bower install custom-linkedin-<name>` and modifying this project's Grunt Task)_.

## Install

```bash
git clone https://github.com/JamieMason/custom-linkedin-cv.git
cd custom-linkedin-cv
npm install
bower install
```

## Configure

Open up app/scripts/services/constants.js

```javascript
.constant('LinkedInConfig', {
        username: '', /**change this to the profile name you want to fetch*/
        apiKey: '', /** get an api key from developers.linkedin.com */
        lang: 'en-US',
        authorize: 'true',
        scope: 'r_basicprofile r_emailaddress r_fullprofile r_network rw_groups'
    })
```

## Run

```bash
grunt build
cd dist
server 9000
```
