contributions
=====================

Shows git project contributions in a form of stacked area charts for multiple projects and branches. Statistics are fetched from locally cloned repositories.
Results are cached and reloaded every half an hour. Results can be filtered out by contributors.

Flexible and programmable configuration allows you to adjust user ids, filter commits or even create your own authentication mechanism.

Usage
=====

```
git clone https://github.com/purplecode/contributions.git myapp
cd myapp
npm install
npm run build
node server/www -c './your.server.config' // see server.default example
open http://localhost:3000
```
Use `npm start` to run webpack watch.

In case of any problems with nodegit installation or problems with libstdc library, check the [package documentation](https://github.com/nodegit/nodegit).

Configuration
=====

Copy and modify `server.default.js`. Then run

```
node server/www -c './your.server.config'
```

Configuration file is a module with the following exports:

### PROJECTS
Projects descriptions and paths to the cloned git projects.

### AUTHORS
Utility for translating git identifiers to readable names. Useful in the case when the same user has different identities in repositories or when you want to anonymize the results 

### AUTHENTICATION
Middleware for authentication. Default configuration contains two implementations. Default, without any restrictions and example one using `password` library. 
In order to use `password` authentication remove the default, uncomment the code and install:

```
npm install password
npm install password-http
```

then login using credentials `username` and `password`.


License
=======

MIT
