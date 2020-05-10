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

1. `npm i`
2. `npm start`
