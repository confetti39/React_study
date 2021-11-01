import './App.css';
import { useState } from 'react';

function App() { //일종의 컴포넌트임

    let [글제목, 글제목변경] = useState(['여자코트 추천', '강남 우동맛집', '파이썬독학']);
    let [따봉, 따봉변경] = useState([0, 0, 0]);
    let [modal, modal변경] = useState(false); //모달창을 켜고 닫는 스위치
    let [누른제목, 누른제목변경] = useState(0);

    let [입력값, 입력값변경] = useState('');

    function 제목바꾸기() {
        const newArray = [...글제목]; //deep copy!
        if (newArray[0] === '남자코트 추천') {
            newArray[0] = '여자코트 추천';
        } else {
            newArray[0] = '남자코트 추천';
        }
        글제목변경(newArray)
    }

    return (
        <div className="App">
            <div className="black-nav">
                <div>개발 blog</div>
            </div>
            <button onClick={제목바꾸기}>버튼</button>
            {
                글제목.map((글, i) => {
                    return ( //key={i}를 추가해야 warning이 안생김.
                        <div className="list" key={i}>
                            <h3 onClick={() => { 누른제목변경(i) }}> {글} <span onClick={() => { 따봉변경(따봉 + 1) }}>🎃</span> {따봉} </h3>
                            <p>2월 18일 발행</p>
                            <hr />
                        </div>
                    )
                })
            }

            <div className="publish">
                <input onChange={(e) => { 입력값변경(e.target.value) }} />
                <button onClick={() => {
                    const arrayCopy = [...글제목];
                    arrayCopy.unshift(입력값); //array 맨 앞에 자료를 추가
                    글제목변경(arrayCopy);
                }}>저장</button>
            </div>




            <button onClick={() => { modal변경(!modal) }}>열고닫기</button>

            {
                modal === true
                    ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal>
                    : null //텅빈 HTML이라는 뜻
            }


        </div >
    );
}

function Modal(props) { //이름 대문자 국룰임
    return (
        <div className="modal">
            <h2>{props.글제목[props.누른제목]}</h2>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    )
    // 의미없는 <div> 쓰기 싫을 때 < >, </> 쓰면 됨
}


export default App;