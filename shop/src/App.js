import './App.css';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useState } from 'react';
import Data from './data.js';

import { Link, Route, Switch } from 'react-router-dom';

function App() {

  let [shoes, shoes변경] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
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
          <div className="row">
            {
              shoes.map((a, i) => {
                return <Card shoes={shoes} i={i}></Card> //shoes = {a}도 사용 가능
              })
            }
          </div>
        </div>
      </Route>


      <Route path="/detail">
        <div>상세페이지</div>
      </Route>


      {/* <Route path="/어쩌구" component={Card}></Route> */}



    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].content} & {props.shoes[props.i].price}원</p>
    </div >
  )
}

export default App;
