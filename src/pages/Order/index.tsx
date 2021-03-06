import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row, DatePicker, Input } from 'antd';
import { useIndexedDB } from 'react-indexed-db';
import { RootState } from '../../redux';
import { setDateTime, setEmail, setNumberOfPeople } from '../../redux/modules/order';
import range from '../../helpers/range';
import NumberSelector from '../../components/numberSelector';

const mapStateToProps = (state: RootState) => ({ order: state.order });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            setEmail,
            setDateTime,
            setNumberOfPeople
        },
        dispatch
    );
};

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Order: React.FC<Props> = ({ setEmail, setDateTime, setNumberOfPeople, order }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { add: addOrder } = useIndexedDB('orders');

    function disabledDate(current: Moment): boolean {
        // Cannot select days before today or if day is during the weekend
        return current && current < moment() || current.isoWeekday() === 6 || current.isoWeekday() === 7;
    }
    function disabledDateTime() {
        // Cannot select hours before 16 or after 23
        return {
            disabledHours: () => range(0, 24).splice(0, 16).concat([23, 24])
        };
    }
    function onOk(value: any) {
        setDateTime(value.toISOString());
    }
    function isDisabled(): boolean {
        return order.email.length === 0 || order.dateTime === null
    }
    function proceedOrder() {
        setLoading(true);
        addOrder(order)
            .then(() => {
                setLoading(false);
                history.push('receipt');
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <>
            {loading && <div className="loading"><h1>loading...</h1></div>}
            <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
                <Col xs={24}>
                    <div className="container border">
                        <h2 className="uppercase bold">Your order</h2>
                        <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
                            <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                                <div className="order-calendar">
                                    <p className="uppercase no-margin">Pick date and time</p>
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm"
                                        disabledDate={disabledDate}
                                        disabledTime={disabledDateTime}
                                        onOk={onOk}
                                        showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                                    />
                                </div>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <NumberSelector
                                    min={1}
                                    max={10}
                                    label="Select amount of people"
                                    value={1}
                                    onChange={(value: number) => setNumberOfPeople(value)}
                                />
                                <p className="uppercase">Enter email</p>
                                <Input type="email" size="large" placeholder="email" value={order.email} onChange={e => setEmail(e.target.value)} />
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                                <Button disabled={isDisabled()} className="uppercase" shape="round" type="primary" block={true} onClick={proceedOrder}>
                                    Order
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    );
}

const OrderScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);

export default OrderScreen;