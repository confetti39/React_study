import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

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
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">

                    <h4 className="pt-5">{findShoe.title}</h4>
                    <p>{findShoe.content}</p>
                    <p>{findShoe.price}</p>

                    <button className="btn btn-danger">주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        history.push('/'); //history.goBack();과 같음
                    }}>뒤로가기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;