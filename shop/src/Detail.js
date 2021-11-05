import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function Detail(props) {

    let { id } = useParams();
    let history = useHistory();

    let findShoe = props.shoes.find(function (shoe) {
        return shoe.id == id
    });

    return (
        <div className="container">
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