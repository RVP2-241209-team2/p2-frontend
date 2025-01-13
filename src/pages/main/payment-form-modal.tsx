import React from 'react';
import { Modal } from '../../Modal/Modal';
import {PaymentForm} from './payment-form';

interface ToggletProps {
    onClose: () => void;
    setPaymentDetail: () => void;
    setBillingAddress: () => void;
}
export const CreatePaymentModal: React.FC<ToggletProps> = ({setBillingAddress, setPaymentDetail, onClose}) => {

    const onAddressClose = ()=>{
        onClose();
        setPaymentDetail();
        setBillingAddress();
      }

    return (
        // <ModalProvider></ModalProvider>
            <div>
                {/* <button onClick={openModal}>Open Modal</button> */}
                {/* {isModalOpen && ()} */}
                    <Modal onClose={onAddressClose}>
                        <PaymentForm {...{onClose, setBillingAddress, setPaymentDetail}} />
                    </Modal>
                
            </div>
        
    );
};