import { HandleClose } from '../../types/HandleClose';
import { HandleDelete } from '../../types/HandleDelete';

import './DeleteConfirmationModal.css';

export default function DeleteConfirmationModal(props: { onClose: HandleClose, onDelete: HandleDelete }) {
    const handleDelete = () => {
        props.onDelete();
        props.onClose();
    };


    return (
        <>
            <div className="modal-overlay">
                <div className="modal delete-modal">
                    <p>Are you sure you want to delete this claim?</p>
                    <div className="modal-buttons">
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={props.onClose}>No</button>
                    </div>
                </div>
            </div>
        </>
    );
}
