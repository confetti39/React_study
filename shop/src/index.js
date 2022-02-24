import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let alertDefault = true;
function reducer2(state = alertDefault, action) {
  if (action.type === '닫기') {
    state = false;
    return state;
  } else {
    return state;
  }
}

let defaultState = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '예쁜신발', quan: 3 }
];

function reducer(state = defaultState, action) {
  if (action.type === '항목추가') {
    if (action.payload.name in defaultState) {
      let copy = [...state];
      return copy;
    }
    let copy = [...state];
    copy.push(action.payload);
    // console.log(copy);
    return copy;
  }
  else if (action.type === '수량증가') {
    let copy = [...state];
    copy[action.id].quan++;
    return copy;
  }
  else if (action.type === '수량감소') {
    let copy = [...state];
    if (copy[action.id].quan === 0) {
      return copy;
    }
    copy[action.id].quan--;
    return copy;
  }
  else {
    return state;
  }
}

let store = createStore(combineReducers({ reducer, reducer2 })); //reducer 여러개 합치는 문법
// 객체형식으로 Reducer 묶어줘야 함.

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
