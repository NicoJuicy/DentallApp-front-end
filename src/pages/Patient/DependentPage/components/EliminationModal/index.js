import { Button, Modal } from 'react-bootstrap';
import styles from '../FormModal/FormModal.module.css';

const EliminationModal = ({show, handleClose, dependentSelect, eliminateDependent}) => {
    return (
        <Modal 
        show={show} 
        onHide={handleClose} 
        dialogClassName={styles.container_modal}>
            <Modal.Header className={styles.container_header} closeButton>
                <Modal.Title>Eliminar dependiente</Modal.Title>
            </Modal.Header>
             <Modal.Body>
                ¿Estás seguro que quieres eliminar a:<br /> 
                {`${dependentSelect.names} ${dependentSelect.lastNames}?`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => eliminateDependent(dependentSelect.dependentId)}>
                    Eliminar
                </Button>
            </Modal.Footer>
      </Modal>
    );
}

export default EliminationModal;