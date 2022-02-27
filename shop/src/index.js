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

let defaultState = [];
function reducer(state = defaultState, action) {
  if (action.type === '항목추가') {
    let copy = [...state];
    let foundIndex = state.findIndex((a) => { return (a.id === action.payload.id && a.size === action.payload.size) })
    if (foundIndex >= 0) {
      copy[foundIndex].quan = parseInt(copy[foundIndex].quan) + parseInt(action.payload.quan);
      return copy;
    } else {
      copy.push(action.payload);
      return copy;
    }
  }
  else if (action.type === '수량증가') {
    let copy = [...state];
    let foundIndex = state.findIndex((a) => { return a.id === action.id && a.size === action.size })
    copy[foundIndex].quan++;
    return copy;
  }
  else if (action.type === '수량감소') {
    let copy = [...state];
    let foundIndex = state.findIndex((a) => { return a.id === action.id && a.size === action.size })
    if (copy[foundIndex].quan === 0) {
      return copy;
    }
    copy[foundIndex].quan--;
    return copy;
  }
  else if (action.type === '항목삭제') {
    let copy = [...state];
    let foundIndex = state.findIndex((a) => { return a.id === action.id });
    console.log(copy);
    copy.shift(foundIndex);
    //배열에서 첫번째 요소를 제거하고 반환한다. -> 배열 항목에서 요소가 삭제됨
    // unshift : 첫번째 요소로 추가

    //항목삭제하고 재고 수량 다시 맞춰주는 코드 필요함
    console.log(copy);
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
