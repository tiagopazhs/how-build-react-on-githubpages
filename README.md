# how-build-react-on-githubpages

Based tutorial on https://blog.logrocket.com/deploying-react-apps-github-pages/

//Install gh pages dependencie
npm install gh-pages --save-dev

//Add homepage property on package.json like this
{
  "name": "how-build-react-on-githubpages",
  "version": "0.1.0",
  "private": true,
  "homepage": "http://tiagopazhs.github.io/{repo-name}",

//Add deploy and predeploy scripts
  "scripts": {
    "start": "react-scripts start",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",

//Run script
npm run deploy

//Change the branch on git
On github > Repositorie > Settings > Pages > Branch > {Change to "gh-pages"}


