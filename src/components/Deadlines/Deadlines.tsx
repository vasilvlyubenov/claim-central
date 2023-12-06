import React, { useState } from 'react';

import { HandleInputChange } from '../../types/HandleInputChange';
import { RegisterFormData } from 'types/RegisterFormData';

import './Deadlines.css';

export default function Deadlines(props: {
    formData: RegisterFormData
    handleInputChange: HandleInputChange
    handleDisabled: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [error, setErrors] = useState('');

    const validateRequiredHandler = () => {
        if ((props.formData.deadlines.d3 === '' 
        || props.formData.deadlines.d4 === '' 
        || props.formData.deadlines.d5 === '' 
        || props.formData.deadlines.d6 === ''
        || props.formData.deadlines.d7 === ''
        || props.formData.deadlines.d8 === '')
        ) {
            setErrors('All fields are required');
            props.handleDisabled(true);
        } else {
            setErrors('');
            props.handleDisabled(false);
        }
    };

    return (
        <div className="mb-4 hidable">
            <h3>Deadlines</h3>
            <p>(number of days from claim announcement <br/> for each phase)</p>
            <hr />
            <div className='deadlines'>
                <div className='deadline-item'>
                    <label htmlFor="d3" className="block font-medium">
                        D3
                    </label>
                    <input
                        type="text"
                        id="firm"
                        name="d3"
                        value={props.formData.deadlines.d3}
                        onChange={props.handleInputChange}
                        onBlur={validateRequiredHandler}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className='deadline-item'>
                    <label htmlFor="d4" className="block font-medium">
                        D4
                    </label>
                    <input
                        type="text"
                        id="firm"
                        name="d4"
                        value={props.formData.deadlines.d4}
                        onChange={props.handleInputChange}
                        onBlur={validateRequiredHandler}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className='deadline-item'>
                    <label htmlFor="d5" className="block font-medium">
                        D5
                    </label>
                    <input
                        type="text"
                        id="firm"
                        name="d5"
                        value={props.formData.deadlines.d5}
                        onChange={props.handleInputChange}
                        onBlur={validateRequiredHandler}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className='deadline-item'>
                    <label htmlFor="d6" className="block font-medium">
                        D6
                    </label>
                    <input
                        type="text"
                        id="firm"
                        name="d6"
                        value={props.formData.deadlines.d6}
                        onChange={props.handleInputChange}
                        onBlur={validateRequiredHandler}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className='deadline-item'>
                    <label htmlFor="d7" className="block font-medium">
                        D7
                    </label>
                    <input
                        type="text"
                        id="firm"
                        name="d7"
                        value={props.formData.deadlines.d7}
                        onChange={props.handleInputChange}
                        onBlur={validateRequiredHandler}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className='deadline-item'>
                    <label htmlFor="d8" className="block font-medium">
                        D8
                    </label>
                    <input
                        type="text"
                        id="firm"
                        name="d8"
                        value={props.formData.deadlines.d8}
                        onChange={props.handleInputChange}
                        onBlur={validateRequiredHandler}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                {error && (<p className='reg-error'>{error}</p>)}
            </div>
        </div>
    );
}