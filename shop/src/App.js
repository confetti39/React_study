import './App.css';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';
import Cart from './Cart.js';
import { Link, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export let stockContext = React.createContext();

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
      console.log(props.shoes);
      history.push('/detail/' + props.shoes.id)
    }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}원</p>
      <Test></Test>
    </div >
  )
}

function Test() {
  let stock = useContext(stockContext);
  return <p>재고: {stock}</p> //재고: 101112
}

export default App;
