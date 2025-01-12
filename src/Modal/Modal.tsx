import React, {useRef, useContext, useEffect, useState, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext<HTMLDivElement | null>(null);

export function ModalProvider({ children }:{children:ReactNode}){
    const [value, setValue] = useState<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        setValue(modalRef.current)
    },[])

    return(
    <>
       <ModalContext.Provider value={value}>
        {children}
       </ModalContext.Provider>
       <div ref={modalRef}>
       </div>
    </>
    )
}

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

export function Modal ({onClose, children}: ModalProps){
    const modalNode =useContext(ModalContext)

    if(!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}>

            </div>
            <div id="modal-content">
                {children}
            </div>

        </div>,
        modalNode
    )
}