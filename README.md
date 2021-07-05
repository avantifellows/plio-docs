# Plio Docs

This repository contains the documentation and guides for [Plio](https://plio.in). The docs can be found [here](https://docs.plio.in).

## Contributing
This is built using [VuePress](https://v2.vuepress.vuejs.org/)

### Serve locally
- Clone the repo and run `npm install`.
- Run `npm run docs:dev` to serve locally.

### Build static files for deployment
- Run `npm run docs:build` to build the app's static files which can be deployed as a static web app.
- The files reside in `docs/.vuepress/dist`.

### Deploy on AWS S3 (staging / prod)
- Run `yarn deploy-staging` or `yarn deploy` to build the static files and push the files to the S3 bucket.

### Add a new top level section
- To add a new section to the docs, create a folder with the appropriate name inside `./docs`.
- Add a `README.md` inside the created folder. Write your content there.
- Add a path to the `sidebar` array inside `themeConfig` in the `docs/.vuepress/config.js` file. 
- For example, if the added section's name is `new-section`, the path that will be added to the `sidebar` array will be `/new-section/`

### Add a subsection to an existing `.md` file
- There are two ways. If the content to be added is smaller in size/length, you can directly add it into the parent `.md` file.
- Otherwise, if you want to keep the new subsection separate, create an `.md` file with the name of the subsection. Let's call it `child.md`.
- Now, to render it inside a parent file, let's say `parent.md`, you'll need to include it inside the `parent.md`. Append this line in your `parent.md` file.
```md
!!!include(./docs/some-section-folder/child.md)!!!
```
