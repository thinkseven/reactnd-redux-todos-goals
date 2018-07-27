// Library Code
function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l != listener)
    }
  }

  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

// App Code
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todos])
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id != action.id)
    case 'TOGGLE_TODO':
      return state.map(
        todo =>
          todo.id != action.id
            ? todo
            : Object.assign({}, todo, { complete: !todo.complete }),
      )
    default:
      return state
  }
}

const store = createStore(todos)

const unsubcriber1 = store.subscribe(() => {
  console.log('Subcribe1: The new state is: ', store.getState())
})
// unsubcriber1()

const unsubcriber2 = store.subscribe(() => {
  console.log('Subcribe2: The new state is: ', store.getState())
})
// unsubcriber2()

store.dispatch({
  type: 'ADD_TODO',
  todos: {
    id: 1,
    name: 'finish redux',
    complete: false,
  },
})

store.dispatch({
  type: 'ADD_TODO',
  todos: {
    id: 2,
    name: 'finish react',
    complete: false,
  },
})

store.dispatch({
  type: 'ADD_TODO',
  todos: {
    id: 3,
    name: 'have doctor appointment',
    complete: false,
  },
})

store.dispatch({
  type: 'ADD_TODO',
  todos: {
    id: 4,
    name: 'visit india',
    complete: false,
  },
})

store.dispatch({
  type: 'REMOVE_TODO',
  id: 4,
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 3,
})
