import './Modal.css'

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};