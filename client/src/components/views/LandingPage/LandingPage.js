import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';


function LandingPage() {

    const [Products, setProducts] = useState([])

    useEffect(() => {
        // let body = {}
        axios.post('/api/product/products')
            .then(response => {
                if (response.data.success){
                    setProducts(response.data.productInfo)
                    console.log(response.data);
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }, [])

    const renderCards = Products.map((product, index) => {
        // image size 가로 정렬
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card 
                cover={<img style={{ width: '100%', maxHeight: '150px'}} src={`http://localhost:5000/${product.images[0]}`} />}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })
    
    return (
        // <>
        //     <div className="app">
        //         <FaCode style={{ fontSize: '4rem' }} /><br />
        //         <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
        //     </div>
        //     <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        // </>

        <div style={{ width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Let's Travel Anywhere <Icon type="rocket"/></h2>
            </div>

            {/* Filter */}


            {/* Search */}


            {/* Cards */}
            {/* 여백 (간격) Row gutter */}
            <Row gutter = {[16, 16]}>
                { renderCards }
            </Row>
            


            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
