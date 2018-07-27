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

// App Code# Action Constants
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// App Code# Action Creators
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

// App Code# reducer 1
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])
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

// App Code# reducer 2
function goals(state = [], action) {
  switch (action.type) {
    case 'ADD_GOAL':
      return state.concat([action.goal])
    case 'REMOVE_GOAL':
      return state.filter(goal => goal.id !== action.id)
    default:
      return state
  }
}

// App Code# Combined Reducer
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

const store = createStore(app)

const unsubcriber1 = store.subscribe(() => {
  console.log('Subcribe1: The new state is: ', store.getState())
})
// unsubcriber1()

const unsubcriber2 = store.subscribe(() => {
  console.log('Subcribe2: The new state is: ', store.getState())
})
// unsubcriber2()

// Todos
store.dispatch(
  addTodoAction({
    id: 1,
    name: 'finish redux',
    complete: false,
  }),
)

store.dispatch(
  addTodoAction({
    id: 2,
    name: 'finish react',
    complete: false,
  }),
)

store.dispatch(
  addTodoAction({
    id: 3,
    name: 'have doctor appointment',
    complete: false,
  }),
)

store.dispatch(
  addTodoAction({
    id: 4,
    name: 'visit india',
    complete: false,
  }),
)

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(3))

// Goals
store.dispatch(
  addGoalAction({
    id: 1,
    name: 'became certified developer',
    complete: false,
  }),
)

store.dispatch(
  addGoalAction({
    id: 2,
    name: 'become rich',
    complete: false,
  }),
)

store.dispatch(
  addGoalAction({
    id: 3,
    name: 'hold valuable wisdome and good parent',
    complete: false,
  }),
)

store.dispatch(
  addGoalAction({
    id: 4,
    name: 'Do not repeat myself',
    complete: false,
  }),
)

store.dispatch(removeGoalAction(2))

store.dispatch(removeGoalAction(3))
