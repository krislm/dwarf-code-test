import React, { useEffect, useState } from 'react';
import { RootState } from '../../redux';
import { Dish, loadDishes } from '../../redux/modules/dishes';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, Col, Row, Card, Modal } from "antd";

const mapStateToProps = (state: RootState) => ({ dishes: state.dishes });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            loadDishes,
        },
        dispatch
    );
};

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Order: React.FC<Props> = ({ loadDishes, dishes }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!dishes.loading && dishes.dishes.length === 0) {
            loadDishes();
        }
    }, [loadDishes, dishes]);

    return (
        <>
            <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
                <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                    <div className="container border">
                    </div>
                    <div className="container border">
                    </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                    <div className="container border">
                        <p className="uppercase">next pick date</p>
                        <p className="uppercase">and amount</p>
                        <Button className="uppercase" type="primary" block={true} onClick={() => alert('todo: go to next')}>
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}

const OrderScreen = connect()(Order);

export default OrderScreen;