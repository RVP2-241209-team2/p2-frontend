import React from 'react';
import { Modal } from '../../Modal/Modal';
import { AddressForm } from './address-form';
import { Address } from './checkout-page';

interface ToggletProps {
    onClose: () => void;
    setSelectAddress: (address:Address) => void;
    setAddresses: (address:Address) => void;
}
export const CreateAddressModal: React.FC<ToggletProps> = ({setAddresses, setSelectAddress, onClose}) => {

    return (
        // <ModalProvider></ModalProvider>
            <div>
                {/* <button onClick={openModal}>Open Modal</button> */}
                {/* {isModalOpen && ()} */}
                    <Modal onClose={onClose}>
                        <AddressForm {...{setAddresses, setSelectAddress, onClose}} />
                    </Modal>
                
            </div>
        
    );
};