import React from 'react';
import { Modal } from '../../Modal/Modal';
import { AddressForm } from './address-form';

interface ToggletProps {
    onClose: () => void;
}
export const CreateAddressModal: React.FC<ToggletProps> = ({onClose}) => {

    return (
        // <ModalProvider></ModalProvider>
            <div>
                {/* <button onClick={openModal}>Open Modal</button> */}
                {/* {isModalOpen && ()} */}
                    <Modal onClose={onClose}>
                        <AddressForm onClose={onClose} />
                    </Modal>
                
            </div>
        
    );
};