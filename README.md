contributions
=====================

Shows git project contributions in a form of stacked area chart. Each project separately and total summary.


Usage
=====

```
git clone https://github.com/purplecode/contributions.git myapp
cd myapp
npm install
npm run build
node server/www -c ./your.server.config // see server.default example
open http://localhost:3000
```
Use `npm start` to run webpack watch.

In case of any problems with nodegit installation or problems with libstdc library, check the [package documentation](https://github.com/nodegit/nodegit).

License
=======

MIT
