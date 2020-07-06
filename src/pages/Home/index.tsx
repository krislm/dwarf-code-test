import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Carousel, Input } from 'antd';
import burger from '../../assets/burger.svg';
import hotdog from '../../assets/hotdog.svg';
import pizza from '../../assets/pizza.svg';
import './home.scss';

const Home = () => {
    const [email, setEmail] = useState('');
    const history = useHistory();

    function find() {
        if (email.length === 0) {
            return;
        }
        console.log('Search by '+email);
    }

    function goTo(route: string) {
        history.push(route);
    }

    return (
        <>
            <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
                <Col xl={18} lg={18} md={18} sm={24} xs={24} flex="stretch">
                    <div className="container border">
                        <Carousel autoplay={true} arrows={true}>
                            <div>
                                <img className="" src={burger} alt="burger-menu"/>
                            </div>
                            <div>
                                <img className="" src={hotdog} alt="hotdog-menu"/>
                            </div>
                            <div>
                                <img className="" src={pizza} alt="pizza-menu"/>
                            </div>
                        </Carousel>
                    </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={24} xs={24} flex="stretch">
                    <div className="container border">
                        <p className="uppercase bold">new order</p>
                        <Button className="uppercase" type="primary" block={true} onClick={() => goTo('dish')}>
                            Order
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="container border">
                        <p className="uppercase bold">find your order</p>
                        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <Button className="uppercase" type="primary" block={true} onClick={() => find()}>find</Button>
                    </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="container border">
                        <p className="uppercase">lorem ipsum</p>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Home;