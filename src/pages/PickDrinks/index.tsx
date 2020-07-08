import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {Button, Col, Row, Card, Modal, Divider} from 'antd';
import { RootState } from '../../redux';
import { Drink, loadDrinks } from '../../redux/modules/drinks';
import { addDrink, removeDrink } from '../../redux/modules/order';
import info from '../../assets/info.svg';
import './drinks.scss';

const mapStateToProps = (state: RootState) => ({ drinks: state.drinks, order: state.order });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            addDrink,
            removeDrink,
            loadDrinks,
        },
        dispatch
    );
};

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const PickDrinks: React.FC<Props> = ({ addDrink, removeDrink, loadDrinks, drinks, order}) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDrink, setModalDrink] = useState<Drink>();
    const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>([]);
    const history = useHistory();

    useEffect(() => {
        if (!drinks.loading && drinks.drinks.length === 0) {
            loadDrinks();
        }
        if (order.drinks) {
            setSelectedDrinks(order.drinks);
        }
    }, [loadDrinks, drinks]);

    function toggleDrink(selectedDrink: Drink) {
        const existingDrink = selectedDrinks.find(item => item.id === selectedDrink.id);
        console.log(existingDrink);
        //const index: number = selectedDrinks.indexOf(selectedDrink);
        if (existingDrink) {
            setSelectedDrinks(selectedDrinks.filter((drink: Drink) => drink.id !== selectedDrink.id));
            removeDrink(selectedDrink);
        } else {
            setSelectedDrinks(selectedDrinks.concat([selectedDrink]));
            addDrink(selectedDrink);
        }
    }

    function proceedOrder() {
        setLoading(true);
        history.push('order');
        setLoading(false);
    }

    const toggleDrinkText = (drink: Drink) => {
        if (selectedDrinks.find(item => item.id === drink.id)) {
            return 'Remove drink'
        }
        return 'Add drink';
    }

    return (
        <>
            <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
                <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                    <div className="container border">
                        <Row gutter={[{ xs: 4, sm: 8, md: 16, lg: 24 }, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
                            {drinks.drinks.map((drink: Drink) => (
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} flex="stretch" key={drink.id}>
                                    <Card className="drink-item" bordered={false}>
                                        <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }} justify="space-around" align="middle">
                                            <Col xl={20} lg={20} md={20} sm={18} xs={18}>
                                                <p className="uppercase bold"><i>{drink.tagline}</i></p>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={6} xs={6}>
                                                <img className="drink-item__info" src={info} alt="see more" onClick={() => {
                                                    setModalDrink(drink);
                                                    setModalVisible(true);
                                                }}/>
                                            </Col>
                                        </Row>
                                        <p className="uppercase drink-item__name">{drink.name}</p>
                                        <Button className="uppercase" type="primary" block={true} onClick={() => toggleDrink(drink)}>
                                            {toggleDrinkText(drink)}
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                    <div className="container border">
                        {selectedDrinks.map((drink: Drink) => (
                            <p className="uppercase no-margin" key={drink.id}>{drink.name}</p>
                        ))}
                        {selectedDrinks.length > 0 && <Divider />}
                        <p className="uppercase">Pick delivery date next!</p>
                        <Button disabled={selectedDrinks.length < 1} className="uppercase" loading={loading} shape="round" type="primary" block={true} onClick={() => proceedOrder()}>
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>
            <Modal visible={modalVisible} closable={true} destroyOnClose={true} onCancel={() => setModalVisible(false)}>
                {
                    modalDrink &&
                    <>
                        <h2 className="uppercase bold">{modalDrink.name}</h2>
                        <p className="uppercase"><i>{modalDrink.tagline}</i></p>
                        <img src={modalDrink.image_url} alt={modalDrink.name} />
                        <p className="uppercase">{modalDrink.description}</p>
                    </>
                }
            </Modal>
        </>
    );
}

const DrinksScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickDrinks);

export default DrinksScreen;