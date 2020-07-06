import React from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from 'antd';

const Home = () => {
    const history = useHistory();

    function goTo(route: string) {
        history.push(route);
    }

    return (
        <>
            <Row>
                <Col span={18}>
                    <div className="container border"></div>
                </Col>
                <Col span={6}>
                    <div className="container border">
                        <p className="uppercase bold">new order</p>
                        <Button type="primary" block={true} onClick={() => goTo('dish')}>
                            Order
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Home;