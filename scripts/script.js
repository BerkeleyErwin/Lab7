// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let pageCnt = 0;

// Make sure you register your service worker here too


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        pageCnt++;
        newPost.id = pageCnt;
        newPost.addEventListener('click', () => {
          setState({name: 'entry', id: newPost.id}, false);
        });
        document.querySelector('main').appendChild(newPost);
      });
    }); 
});

let settings = document.querySelector('img[alt=settings]');
  settings.addEventListener('click', () => {  
    setState('settings',  true);
});

let title = document.querySelector('h1');
  title.addEventListener('click', () => {
    setState('home', true);
});

window.addEventListener('popstate', (event) => {
  setState(event.state.page, true);
});