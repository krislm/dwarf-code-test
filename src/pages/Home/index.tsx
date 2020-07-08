import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Button, Carousel, Input } from 'antd';
import { useIndexedDB } from 'react-indexed-db';
import { bindActionCreators, Dispatch } from 'redux';
import { setOrder } from '../../redux/modules/order';
import burger from '../../assets/burger.svg';
import hotdog from '../../assets/hotdog.svg';
import pizza from '../../assets/pizza.svg';
import './home.scss';
import {RootState} from "../../redux";

const mapStateToProps = (state: RootState) => ({ order: state.order });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators( { setOrder }, dispatch );
}

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Home: React.FC<Props> = ({ setOrder, order }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const history = useHistory();
    const { openCursor } = useIndexedDB('orders');

    async function find() {
        if (email.length === 0) {
            return;
        }
        // open object store cursor & iterate to find the matching entry
        await openCursor((evt: any) => {
            const cursor: any = evt.target.result;
            if (cursor) {
                if (cursor.value.email === email) {
                    setOrder(cursor.value);
                    history.push('dish');
                } else {
                    cursor.continue();
                }
            } else {
                // iterated through all entries
                setError('Order not found');
            }
        });
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
                        {
                            error && <p className="uppercase error">{error}</p>
                        }
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

const HomeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
export default HomeScreen;