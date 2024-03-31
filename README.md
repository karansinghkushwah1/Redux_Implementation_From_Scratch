# Redux_Implementation_From_Scratch

This repository contains a custom implementation of Redux from scratch in vanilla JavaScript. It includes basic functions for creating a Redux store, combining reducers, applying middleware, and dispatching actions.

## Functions Implemented

### createStore(reducer)

Creates a Redux store that holds the complete state tree of your application. It takes a `reducer` function as an argument, specifying how the state should be updated in response to dispatched actions. The store has methods:
- `getState()`: Returns the current state of the store.
- `dispatch(action)`: Dispatches an action to update the state.
- `subscribe(listener)`: Registers a listener function to be called whenever the state changes.

### combineReducers(reducers)

Combines multiple reducers into one. It takes an object `reducers` where each key represents a slice of the state, and each value is a reducer function. It returns a single reducer function that manages the state of the entire application by delegating state updates to the appropriate slice reducers.

### applyMiddleware(...middlewares)

Enhances the `createStore` function to apply middleware to the `dispatch` function. It accepts one or more `middlewares` as arguments and returns a function that takes `createStore` as an argument. This function, in turn, returns another function that takes the `reducer` as an argument. It allows you to apply middleware to the dispatch function.

## How to use?

```bash
$ git clone https://github.com/your-username/redux-from-scratch.git
$ cd redux-from-scratch
$ npm install
$ node redux_implementation.js
```

## Expected Output - 
```bash
Action: INCREMENT
Previous state: { counter: 5, user: {} }
Current state: { counter: 6, user: {} }
Next state: { counter: 6, user: {} }
Action: SET_USER
Previous state: { counter: 6, user: {} }
Current state: { counter: 6, user: { name: 'Ram Singh' } }
Next state: { counter: 6, user: { name: 'Ram Singh' } }
```
