import React from 'react';
import { Modal } from '../../Modal/Modal';
import {PaymentForm} from './payment-form';
import { Payment } from './checkout-page';

interface ToggletProps {
    onClose: () => void;
    setPaymentDetail: () => void;
    setBillingAddress: () => void;
    setSelectPayment: (payment: Payment) => void;
}
export const CreatePaymentModal: React.FC<ToggletProps> = ({setSelectPayment, setBillingAddress, setPaymentDetail, onClose}) => {

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
                        <PaymentForm {...{setSelectPayment, onClose, setBillingAddress, setPaymentDetail}} />
                    </Modal>
                
            </div>
        
    );
};