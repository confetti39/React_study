import './App.css';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from 'react';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';
import Cart from './Cart.js';
import { Link, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export let stockContext = React.createContext();
localStorage.setItem("recent", JSON.stringify([]));
const output = localStorage.getItem("recent");
const arr = JSON.parse(output);

function App() {

  let [shoes, setShoes] = useState(Data);
  let [loading, setLoading] = useState(false);
  let [stock, setStock] = useState([10, 11, 12]); //재고 데이터
  //중요한 데이터는 App에서 관리하는 것이 정석임.(상위 컴포넌트 -> 하위 컴포넌트)

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Shoe Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart</Nav.Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 중복이 되면 맨 위에것만 매칭해서 보여줌 */}
      <Switch>

        {/* exact라는 속성 추가하면 경로가 정확히 일치할 때만 보여줌 */}
        <Route exact path="/">
          <div className="background">
            <h1>20% season off</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>
          <div className="container">

            <div className="recentProduct">
              <h4>watched recently</h4>
              <div className="row">
                {
                  arr.map((a, i) => {
                    return <Recent shoes={shoes[a]} i={i} key={i}></Recent>
                  })
                }
              </div>
            </div>

            <stockContext.Provider value={stock}>
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i} key={i}></Card> //shoes = {a}도 사용 가능
                  })
                }
              </div>
            </stockContext.Provider>

            <button className="btn btn-primary" onClick={() => {

              setLoading(true)
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  // console.log(result.data);
                  setLoading(false);
                  setShoes([...shoes, ...result.data])
                })
                .catch(() => {
                  setLoading(false);
                  console.log("실패");
                })

            }}>더보기</button>

            {
              loading === true
                ?
                <p>로딩중</p>
                :
                null
            }

          </div>
        </Route>


        <Route path="/detail/:id">
          <stockContext.Provider value={stock}>
            <Detail shoes={shoes} stock={stock} setStock={setStock} />
          </stockContext.Provider>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

        <Route path="/:id">
          <div>아무거나 적었을 때 보여주는 것</div>
        </Route>



        {/* <Route path="/어쩌구" component={Card}></Route> */}

      </Switch>

    </div >
  );
}



function Card(props) {
  let stock = useContext(stockContext);
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={() => {
      // localStorge에 저장된 배열의 원소 개수가 3개일 경우 
      // 1. 추가하려는 원소가 배열에 포함되어 있는지 확인하고
      // 포함되어 있다면 그 원소를 지우고, 맨 뒤에 새로 추가한다
      // 2. 추가하려는 원소가 배열에 포함되어 있지 않다면
      // 그냥 맨 앞에 있는 원소 지우고 맨 뒤에 새로운 원소를 추가한다.

      // localStorge에 저장된 배열의 원소 개수가 3개 미만일 경우
      // 추가하려는 원소가 배열에 포함되어 있다면 삭제하지도 않고 추가하지도 않음
      // 추가하려는 원소가 배열에 포함되어 있지 않다면 바로 추가함.
      if (arr.length >= 3) {
        if (arr.indexOf(props.shoes.id) >= 0) {
          const index = arr.indexOf(props.shoes.id);
          console.log(index);
          arr.splice(index, 1);
          arr.push(props.shoes.id);
        }
        else {
          arr.shift(); //맨 앞 원소 삭제
          arr.push(props.shoes.id); //배열 맨 뒤에 원소 추가
        }
      } else {
        if (arr.indexOf(props.shoes.id) >= 0) {
          const index = arr.indexOf(props.shoes.id);
          console.log(index);
          arr.splice(index, 1);
        }
        arr.push(props.shoes.id);
      }
      localStorage.setItem("recent", JSON.stringify(arr));
      console.log(arr);

      // console.log(props.shoes);
      history.push('/detail/' + props.shoes.id);
    }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}원</p>
      {/* <Test></Test> */}
    </div >
  )
}

function Recent(props) {
  let history = useHistory();
  return (
    <div className="col-md-4" onClick={() => {

      // localStorge에 저장된 배열의 원소 개수가 3개일 경우 
      // 1. 추가하려는 원소가 배열에 포함되어 있는지 확인하고
      // 포함되어 있다면 그 원소를 지우고, 맨 뒤에 새로 추가한다
      // 2. 추가하려는 원소가 배열에 포함되어 있지 않다면
      // 그냥 맨 앞에 있는 원소 지우고 맨 뒤에 새로운 원소를 추가한다.

      // localStorge에 저장된 배열의 원소 개수가 3개 미만일 경우
      // 추가하려는 원소가 배열에 포함되어 있다면 삭제하지도 않고 추가하지도 않음
      // 추가하려는 원소가 배열에 포함되어 있지 않다면 바로 추가함.
      if (arr.length >= 3) {
        if (arr.indexOf(props.shoes.id) >= 0) {
          const index = arr.indexOf(props.shoes.id);
          console.log(index);
          arr.splice(index, 1);
          arr.push(props.shoes.id);
        }
        else {
          arr.shift(); //맨 앞 원소 삭제
          arr.push(props.shoes.id); //배열 맨 뒤에 원소 추가
        }
      } else {
        if (arr.indexOf(props.shoes.id) >= 0) {
          const index = arr.indexOf(props.shoes.id);
          console.log(index);
          arr.splice(index, 1);
        }
        arr.push(props.shoes.id);
      }
      localStorage.setItem("recent", JSON.stringify(arr));
      console.log(arr);

      // console.log(props.shoes);
      history.push('/detail/' + props.shoes.id);
    }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes.id + 1) + '.jpg'} width="50%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}원</p>
    </div>
  )
}

function Test() {
  let stock = useContext(stockContext);
  return <p>재고: {stock}</p> //재고: 101112
}

export default App;
