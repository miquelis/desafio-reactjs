import '../styles/Modal.css'
import { ReactNode } from "react";
interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}
export default function Modal(props: ModalProps) {

  return (
    <>
      {props.isOpen && (
        
        <div onClick={props.toggle} className='Modal__Backdrop'>
          <div onClick={(e) => e.stopPropagation()} className='Modal__Box'>
            
              {props.children}
            
          </div>
        </div>
        
      )}
    </>
    
    
  )
}