import React, { useEffect, useState } from 'react';
import { RootState } from '../../redux';
import {Drink, loadDrinks} from '../../redux/modules/drinks';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, Col, Row, Card, Modal } from "antd";
import info from '../../assets/info.svg';
import './drinks.scss';

const mapStateToProps = (state: RootState) => ({ drinks: state.drinks });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            loadDrinks,
        },
        dispatch
    );
};

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const PickDrinks: React.FC<Props> = ({ loadDrinks, drinks}) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!drinks.loading && drinks.drinks.length === 0) {
            loadDrinks();
        }
    }, [loadDrinks, drinks]);

    function addDrink(drink: Drink) {

    }

    return (
        <>
            <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
                <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                    <div className="container border">
                        <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
                            {drinks.drinks.map(drink => (
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} flex="stretch" key={drink.id}>
                                    <Card className="drink-item" bordered={false}>
                                        <p className="uppercase bold"><i>{drink.tagline}</i></p>
                                        <p className="uppercase drink-item__name">{drink.name}</p>
                                        <Button className="uppercase" type="primary" block={true} onClick={() => alert('todo: add to cart')}>
                                            Add drink
                                        </Button>
                                        <img className="drink-item__info" src={info} alt="see more"/>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
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
            <Modal></Modal>
        </>
    );
}

const DrinksScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickDrinks);

export default DrinksScreen;