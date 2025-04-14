<p align="center" ><img src="images/logo.png" width="200px"></p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/710d1918-9a1c-4242-95b1-3ff614e1b2be/deploy-status)](https://app.netlify.com/sites/tracksit/deploys)

# TracksIt - Personal Expense Tracker

**TracksIt** is a personal, client-based, expense tracker web app that makes use of native web apis to perform tradition serverside tasks.
Everything is stored on the browser using **localStorage**, **indexedDB** and **cacheStorage**. The **Progressive Web App** was designed with mobile in mind
and thus can also be used while offline provided that the dashboard was opened **at least once** while online. This allows caching of the pages so 
as to make the offline transition a smooth experience.

## Tech Stack

- HTML
- CSS + Bootstrap
- Vanilla JavaScript + ChartJS

## Storage

- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is mainly used to store user settings.
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) stores the actual expenses data.
- [CacheStorage]() stores all the assets required when navigating offline.

## Features

- Add your expenses
- Edit your previous expenses
- Get a summary of your monthly expenses on the dashboard or a detailed summary in a table
- Add a budget to stay on track
- Modify how to chart looks

## Upcoming features

- Ability to switch themes(light/dark)
- Ability to change font and font-size
- Ability to download all recorded expenses as a csv
- and more

### Found a bug? Open an issue.

## About the project

**TracksIt** is a project that is dear to me as it is one that I use on a regular basis to keep track of my expenses specially as a student.

If you find this project cool, give it a star ⭐.
