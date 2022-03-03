import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { stockContext } from './App.js'
import { Nav } from 'react-bootstrap';


import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

let Box = styled.div`
    padding: 20px;
`;

let Title = styled.h4`
    font-size: 25px;
    color: ${props => props.color}
`;

function Detail(props) {

    let { id } = useParams();
    let history = useHistory();
    let findShoe = props.shoes.find(shoe => shoe.id == id);
    let [inputData, setInputData] = useState();
    let [visible, setVisible] = useState(true);
    let stock = useContext(stockContext);
    let [touchedTab, setTouchedTab] = useState(0);
    let [switch1, setSwitch] = useState(false);
    let [quan, setQuan] = useState(1);
    let [size, setSize] = useState('S');
    const onChangeQuan = (e) => {
        setQuan(e.target.value);
    }

    function handleOnChange(e) {
        setSize(e.target.value);
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setVisible(false);
        }, 2000)

        return () => { clearTimeout(timer) };
    }, []); //그냥 컴포넌트 로드때만 한번 딱 실행하고 싶은 코드를 담을 때 쓸 수 있는 일종의 트릭쇼

    return (
        <div className="container">

            <Box>
                <Title className="red">Detail</Title>
                {/* <Title color='blue'>Detail</Title> */}
            </Box>

            {/* {inputData}
            <input onChange={(e) => { setInputData(e.target.value) }} /> */}

            {
                visible === true
                    ?
                    <div className="myAlertYellow">
                        <p>재고가 얼마 남지 않았습니다!</p>
                    </div>
                    :
                    null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (parseInt(window.location.pathname.split("/").pop()) + 1) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6 mt-4">

                    <h4 className="pt-5">{findShoe.title}</h4>
                    <p>{findShoe.content}</p>
                    <p>{findShoe.price}</p>

                    <Stock stock={props.stock}></Stock>

                    <input type="text" onChange={onChangeQuan} placeholder="주문수량" id="quan" name="quan" required minLength="1" maxlength="10" />
                    <select name="size" onChange={handleOnChange}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                    <br />
                    <br />
                    <button type="submit" className="btn btn-danger" onClick={() => {
                        const newArray = [...props.stock];
                        newArray[0]--;
                        if (newArray[0] < 0) {
                            newArray[0] = 0;
                        }
                        props.setStock(newArray);
                        let productId = window.location.pathname.split('/').pop();
                        props.dispatch({ type: '항목추가', payload: { id: productId, name: props.shoes[productId].title, quan: quan, size: size } });
                        history.push('/cart');

                    }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        props.setShoes([...props.shoes]);
                        history.push('/'); //history.goBack();과 같음
                    }}>뒤로가기</button>

                </div>
            </div>


            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => { setSwitch(false); setTouchedTab(0); }}>Option 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { setSwitch(false); setTouchedTab(1); }}>Option 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => { setSwitch(false); setTouchedTab(2); }}>Option 3</Nav.Link>
                </Nav.Item>
            </Nav>

            {/* 애니메이션 필요한 곳 감싸기 */}
            <CSSTransition in={switch1} classNames="animation" timeout={500}>
                <TabContent touchedTab={touchedTab} setSwitch={setSwitch}></TabContent>
            </CSSTransition>


        </div >
    )
}
function TabContent(props) {

    useEffect(() => {
        props.setSwitch(true);
    });

    if (props.touchedTab === 0) {
        return <div>0번째 내용입니다.</div>
    } else if (props.touchedTab === 1) {
        return <div>1번째 내용입니다.</div>
    } else if (props.touchedTab === 2) {
        return <div>2번째 내용입니다.</div>
    }
}

function Stock(props) {
    return (
        <p>재고: {props.stock[0]}</p>
    )
}

function 함수명(state) {
    return {
        state: state.reducer, //state라는 이름의 props로 바꿈
        alertState: state.reducer2
    }
}
export default connect(함수명)(Detail)