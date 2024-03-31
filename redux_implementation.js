// Create store function
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({}); // Initial dispatch to set the initial state

    return { getState, dispatch, subscribe };
};


// Define combineReducers
const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {});
    };
};

// Define applyMiddleware
const applyMiddleware = (...middlewares) => {
    return (createStore) => (reducer) => {
        const store = createStore(reducer);
        let dispatch = (action) => {
            throw new Error('Can not dispatch when constructing middlewares.');
        };

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        };

        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);

        return {
            ...store,
            dispatch
        };
    };
};

// Below is compose function for composing multiple functions
const compose = (...funcs) => {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
};


// Example 

// Reducers
const counterReducer = (state = 5, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
});

// Middleware
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Action:', action.type);
    console.log('Previous state:', store.getState());
    const result = next(action);
    console.log('Next state:', store.getState());
    return result;
};

// Create store with combined reducer and middleware
const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Subscribe to store changes
const unsubscribe = store.subscribe(() => {
    console.log('Current state:', store.getState());
});

// Dispatch actions
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'SET_USER', payload: { name: 'Ram Singh' } });

// Unsubscribe from store changes
unsubscribe();
