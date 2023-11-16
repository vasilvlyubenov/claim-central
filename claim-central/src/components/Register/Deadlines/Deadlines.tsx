import { HandleInputChange } from '../../../types/HandleInputChange';
import { RegisterFormData } from '../../../types/RegisterFormData';
import './DeadLines.css';

export default function Deadlines(props: {
    formData: RegisterFormData
    handleInputChange: HandleInputChange
}) {

    return (
        <div className="mb-4 hidable">
            <h3>Deadlines</h3>
            <hr/>
            <div className='deadlines'>
              <div className='deadline-item'>
              <label htmlFor="d3" className="block font-medium">
                D3
              </label>
              <input
                type="text"
                id="firm"
                name="d3"
                value={props.formData.d3}
                onChange={props.handleInputChange}
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
                value={props.formData.d4}
                onChange={props.handleInputChange}
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
                value={props.formData.d5}
                onChange={props.handleInputChange}
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
                value={props.formData.d6}
                onChange={props.handleInputChange}
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
                value={props.formData.d7}
                onChange={props.handleInputChange}
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
                value={props.formData.d8}
                onChange={props.handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              </div>
            </div>
          </div>
    );
}