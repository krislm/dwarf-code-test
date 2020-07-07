import React, { useState } from 'react';
import './numberSelector.scss';

type NumberSelectorProps = {
    min: number,
    max: number,
    label: string,
    value?: number,
    onChange?: (value: number) => void
};

const NumberSelector = ({ min, max, label, value = 1, onChange = (() => {}) }: NumberSelectorProps) => {
    const [currentValue, setCurrentValue] = useState(value);

    function decrement() {
        if (currentValue === min) return;
        const newValue = currentValue - 1;
        setCurrentValue(newValue);
        onChange(newValue);
    }
    function increment() {
        if (currentValue === max) return;
        const newValue = currentValue + 1;
        setCurrentValue(newValue);
        onChange(newValue);
    }
    return (
        <div className="number-selector">
            <p className="label uppercase text-center">{label}</p>
            <div className="selector">
                <div className="left" onClick={decrement} />
                <div className="value">{currentValue}</div>
                <div className="right" onClick={increment} />
            </div>
        </div>
    );
}

export default NumberSelector;