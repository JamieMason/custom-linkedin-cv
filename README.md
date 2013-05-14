import-linkedin-profile
=======================

In a nutshell, this Node.js module uses [LinkedIn's API](http://developer.linkedin.com) to retrieve your profile as JSON. Having this data can allow you to generate a CV or use as part of your Website, while managing this data in one place using LinkedIn - if you're into that kind of thing.

## Installation

1. `$ git clone https://github.com/JamieMason/import-linkedin-profile.git`
2. `$ cd import-linkedin-profile`
3. `$ npm install`

## Register an Application with LinkedIn

Visit developer.linkedin.com and follow the [Add New Application](https://www.linkedin.com/secure/developer?newapp=) procedure. 

After you've done that you'll be given some OAuth Keys labelled;

+ API Key
+ Secret Key
+ OAuth User Token
+ OAuth User Secret

## Packaged Example

An example can be found in [example/server.js](https://github.com/JamieMason/import-linkedin-profile/blob/master/example/server.js), so let's use that.

1. For the sake of this example, create a file called **api-keys.json** in the **import-linkedin-profile** directory, containing the application details you registered with LinkedIn;

	    {
	      "apiKey": "xxxxxxxxxxxx",
	      "secretKey": "xxxxxxxxxxxxxxxx",
	      "oauthUserToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	      "oauthUserSecret": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	      "salt": "Anything you like."
	    }

2. `$ node example/server.js`
3. `$ open http://localhost:3000`
4. In your browser you _should_ see a "Login and authorise app" link with our Node.js server exposed temporarily over [localtunnel.com](http://progrium.com/localtunnel/) so LinkedIn can see it.
5. Following that link should prompt you to login to LinkedIn and authorise your own application access to your profile data.
6. On logging in, you'll be redirected to your server which should serve you your LinkedIn profile in JSON format.



