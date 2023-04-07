# Rick and Morty DB

The Dashboard allows the visualization of the characters of "Rick and Morty".

<img src="https://res.cloudinary.com/stefano75/image/upload/v1680766570/RickMorty_acqtqk.png" width="350"/>

- [Rick and Morty DB](#rick-and-morty-db)
  - [The challenge](#the-challenge)
  - [Links](#links)
  - [Setup](#setup)
  - [Building the app](#building-the-app)
    - [Tech](#tech)
    - [Rick \& Morty API](#rick--morty-api)
    - [React Context API](#react-context-api)
    - [Modal](#modal)
    - [Performance](#performance)
  - [Testing](#testing)
  - [References](#references)

## The challenge

The dashboard should display these features:

- Character list screen;
- Detail of the character visible in a modal;
- Have search input;
- Pagination;
- Add/remove a character to your favorite characters list;
- See list of favorite characters;

## Links

- [Live Site URL](https://rickmortydb.netlify.app/)

## Setup

```bash

# Install dependencies
$ npm install

# Run the dev server
$ npm run dev

# Build for production
$ npm run build

# Run tests
$ npm run test
```

## Building the app

### Tech

I used React, React Router, Typescript and the Context API.

For the UI I used CSS.

### Rick & Morty API

To get the raw data from the [Rick & Morty API](https://rickandmortyapi.com/documentation)I decided to use these endpoints:

- https://rickandmortyapi.com/api/character to get all characters;
- https://rickandmortyapi.com/api/character/?name=rick to get the character with name: "rick";
- https://rickandmortyapi.com/api/episode/[10,28] to get for instance episode n. 10 and 28.

### React Context API

Context API provides a way to pass data through the component tree without having to pass props down manually at every level (props drilling). I decided to use it to keep the code organized.

### Modal

The modal has been implemented by using the React Router useLocation hook.

The useLocation hook let you also pass the state prop. I used the state prop to pass the data from the home route to the modal.

### Performance

Each character card on the home page has to loop the favorite array to know how to render the Like button which is O(n) operation. So I decided to use a Javascript Map object which could be represented as a hash table data structure with O(1) lookup, insertion and deletion.

## Testing

The unit tests performed concern the file app.tsx and test the following features:

- Renders Rick & Morty DB link on the header
- Renders user input on search form
- Renders the word Characters
- Renders results data
- Renders results on user input
- Navigating to favorites route
- Add to favorite and navigate to favorites
- Landing on a bad page
- Open modal

I used these tools:

- Vitest
- React Testing Library

## References

- [React Router docs - modal example](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/modal?file=src%2FApp.tsx)

- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

- [Fast Unit Testing With Vitest](https://youtu.be/FDEf3iWEgFI)
