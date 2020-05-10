---
title: Homevision assessment
author: Connor Zanin
---

# Infintine Scroll

Hi Homevision! Thanks for this coding assessment. I'm a huge fan of the shift from leetcode question to more practical coding puzzles.



## Design

The main challenge of this project was to create an infinite scroll that handles api failures. To do this, my solution has 2 key features:

1. Page requests are retried until successful
2. Multiple pages are requested concurrently

I retry loading the same page of entries because even though the first request may fail, I still want to _eventually_ return those results to the user. 

I load multiple pages at the same time because some may fail while others may succeed.
When the number of simultaneous requests is higher, the probability of all of the requests failing for that request time slot is lower.
This is a case of fault tolerance by replication.
With the same time cost (tcp handshake + http request), there is a higher probability of success and lower average load time for the user.

I made one key observation: the requirements **DO NOT** specify results must be ordered. Therefore, though my logic solves the problem of loading duplicate pages, it does not solve the problem of ordering those pages. The list grows on a first-come-first-serve basis.

### Download algorithm
See the `HomeList` constructor for relevant constants.

The download algorithm runs once every 500ms. It checks the current scroll position. If the user is close enough to the end, it begins the next load cycle. Critically, it does this _before the end of the page is visible_. 

# Building
For this project I used react's tools. Below you'll find the remnants from the auto-generated readme file. I though I'd keep it around because it has instructs for building/running the app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
