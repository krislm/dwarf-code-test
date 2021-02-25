import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, Col, Row, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux';
import { loadDishes } from '../../redux/modules/dishes';
import { addDish } from '../../redux/modules/order';

const mapStateToProps = (state: RootState) => ({ dishes: state.dishes, order: state.order });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            loadDishes,
            addDish
        },
        dispatch
    );
};

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const PickDish: React.FC<Props> = ({ addDish, loadDishes, dishes, order }) => {
    const [currentDish, setCurrentDish] = useState(dishes.dishes[0]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!order.dish && !dishes.loading && dishes.dishes.length === 0) {
            loadDishes();
        } else if(order.dish) {
            setCurrentDish(order.dish);
        } else {
            setCurrentDish(dishes.dishes[0]);
        }
    }, [loadDishes, dishes]);

    async function randomize() {
        await loadDishes();
        setCurrentDish(dishes.dishes[dishes.dishes.length - 1]);
    }
    function proceedOrder() {
        setLoading(true);
        addDish(currentDish);
        history.push('drinks')
        setLoading(false);
    }
    return (
        <>
            <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }}>
                <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                    <div className="container border">
                        {
                            currentDish &&
                            <>
                                <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }} justify="space-around" align="middle">
                                    <Col xl={20} lg={20} md={20} sm={18} xs={18}>
                                        <h2 className="uppercase">{currentDish.strMeal}</h2>
                                    </Col>
                                    <Col xl={4} lg={4} md={4} sm={6} xs={6}>
                                        <img width="100%" src={currentDish.strMealThumb} alt={currentDish.strMeal}/>
                                    </Col>
                                </Row>
                                <Divider />
                                <p className="uppercase no-margin">{currentDish.strInstructions}</p>
                            </>
                        }
                    </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                    <div className="container border">
                        <p className="uppercase bold">{currentDish && currentDish.strMeal}</p>
                        <p className="uppercase">Pick some drinks next!</p>
                        <Button className="uppercase" loading={loading} shape="round" type="primary" block={true} onClick={() => proceedOrder()}>
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>
            <Button className="uppercase margin--top" shape="round" type="primary" onClick={() => randomize()}>
                Generate new dish
            </Button>
        </>
    );
}

const DishScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickDish);

export default DishScreen;