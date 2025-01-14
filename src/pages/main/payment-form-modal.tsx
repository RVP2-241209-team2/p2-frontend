import React from 'react';
import { Modal } from '../../Modal/Modal';
import {PaymentForm} from './payment-form';
import { Address, Payment } from './checkout-page';

interface ToggletProps {
    onClose: () => void;
    setPaymentDetail: () => void;
    setBillingAddress: () => void;
    addNewPayment: (payment: Payment) => void;
    addresses: Address[]
}
export const CreatePaymentModal: React.FC<ToggletProps> = ({addresses, addNewPayment, setBillingAddress, setPaymentDetail, onClose}) => {

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
                        <PaymentForm {...{addresses, addNewPayment, onClose, setBillingAddress, setPaymentDetail}} />
                    </Modal>
                
            </div>
        
    );
};