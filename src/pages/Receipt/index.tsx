import React from 'react';
import { connect } from 'react-redux';
import {RootState} from "../../redux";

const mapStateToProps = (state: RootState) => ({ order: state.order });
type Props = ReturnType<typeof mapStateToProps>

const Receipt: React.FC<Props> = ({ order }) => {
    return (
        <div>
            <h1>Receipt</h1>
            <div>
                <p>your order:</p>
                <p>drinks:</p>
                {order.drinks.map(drink =>
                    <p key={drink.id}>{drink.name}</p>
                )}
                <p>dish: {order.dish?.strMeal}</p>
                <p>delivery: {order.dateTime}</p>
                <p>number of people: {order.numberOfPeople}</p>
                <p>email: {order.email}</p>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Receipt);