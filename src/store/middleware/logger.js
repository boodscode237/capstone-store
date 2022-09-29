export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action)
    }
    console.log('type: ', action.type)
    console.log('payload: ', action.payload)
    console.log('currentState: ', store.getState())

    next(action)
    console.log('next state: ', store.getState())
}

// this can be used in place of redux logger to log out the steps followed behind the scene