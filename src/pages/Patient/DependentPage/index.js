import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { IoAddCircle } from "react-icons/io5";
import { AlertMessage } from '../../../components';
import { DependentTable, FilterComponent, FormModal, EliminationModal } from './components';
import { trimSpaces, capitalizeFirstLetter } from '../../../utils/stringUtils';
import { getDependents, createDependent, updateDependent, deleteDependent } from '../../../services/DependentService';
import styles from './DependentPage.module.css';

const DependentPage = () => {
    // Estados para el filtro
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    // Estado para los datos de la tabla
    const [dataDependents, setDataDependents] = useState(null);
    const [isChange, setIsChange] = useState(false);
    const [filterDependents, setFilterDependents] = useState([]);

    // Estado para el modal de creación y actualización de información de dependientes
    const [show, setShow] = useState(false);
    const [dependentSelect, setDependentSelect] = useState(null);

    // Estado para el modal de eliminación de dependientes 
    const [typeModal, setTypeModal] = useState('form');

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        getDependents()
        .then(res => {
            setDataDependents(res.data);
            setFilterDependents(res.data)
        })
        .catch(err => console.log(err));
        //setFilterDependents(dependents)
    }, [isChange]);
     
    useEffect(() => {
        if(filterDependents.length > 0 && filterText !== '') filterData();
        
        if(filterDependents?.length <= 0 || filterText === '') setFilterDependents(dataDependents);
    }, [filterText]);


    const filterData = () => {
        const data = filterDependents.filter(dependent => 
            dependent.dependentId.toString().includes(filterText.toLocaleLowerCase()) === true || 
                dependent.names.toString().toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) === true ||
                dependent.lastNames.toString().toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) === true ||
                dependent.cellPhone.toString().includes(filterText.toLocaleLowerCase()) === true
        );
        setFilterDependents(data);
    }

    // Función que capta los datos que se ingresa en el input y realiza el filtro de la tabla 
    const handleChange = (e) => {
        setFilterText(e.target.value.toString());
        if(filterText === '' || filterDependents.length <= 0) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterDependents(dataDependents);
        }
    }

    // Función que limpia los campos del input y resetea la tabla
    const handleClear = () => {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterDependents(dataDependents);
        setFilterText('');
    };

    // Funciones para cerrar y mostrar el modal
    const handleClose = () => { 
        setShow(false);
        setDependentSelect(null);
    }
    const handleShow = () => setShow(true);

    // Función guardar datos de nuevo dependiente
    const saveDependent = async (data, reset, type) => {
        // Se elimina espacios innecesarios
        const sanitizedName = trimSpaces(data.names);
        const sanitizedLastName = trimSpaces(data.lastNames);

        // Se convierte a mayúscula la primer letra de cada palabra
        data.names = capitalizeFirstLetter(sanitizedName);
        data.lastNames = capitalizeFirstLetter(sanitizedLastName);
        data.genderId = parseInt(data.genderId);
        data.kinshipId = parseInt(data.kinshipId);

        if(type === 'create') {
            const result = await createDependent(data);
            if(result.success && result.success === true) setIsChange(!isChange);
            
            setAlert(result);
        }    
        else {
            data.dependentId = dependentSelect.dependentId;
            const result = await updateDependent(data);

            if(result.success && result.success === true) {
                setIsChange(!isChange);
            }
            handleClose();
            setAlert(result);
        }
        reset();
        setDependentSelect(null);
    }

    const eliminateDependent = async(data) => {
        const result = await deleteDependent(data);
        
        if(result.success && result.success === true) {
            setIsChange(!isChange);
        }
        handleClose();
        setAlert(result);
        setDependentSelect(null);
    }

    return (
        <>
            { 
                show === true ? (
                    typeModal === 'form' ? (
                        <FormModal 
                        handleClose={handleClose} 
                        show={show}
                        saveDependent={saveDependent}
                        alert={alert}
                        setAlert={setAlert}
                        dependentSelect={dependentSelect} /> 
                    ):(
                        <EliminationModal
                        handleClose={handleClose} 
                        show={show}
                        dependentSelect={dependentSelect}
                        alert={alert}
                        setAlert={setAlert}
                        eliminateDependent={eliminateDependent}
                         />
                    )
                ):<></>
                
            }
            <h1 className={styles.page_title}>Gestión de Dependientes</h1>
            { 
                alert && 
                <div className={styles.container_alert}>
                    <AlertMessage 
                    type={ alert.success === false ? 'danger' : 'success' }
                    message={ alert.message }
                    setError= { setAlert }  /> 
                </div>
            }
            <div className={styles.container_header}>
                <Button 
                className={styles.button_add} 
                onClick={() => {
                    setTypeModal('form');
                    handleShow();
                }}> 
                    <IoAddCircle className={styles.icon} /> Nuevo
                </Button>
                <FilterComponent 
                onFilter={handleChange} 
                onClear={handleClear} 
                filterText={filterText}
                setFilterText={setFilterText}
                className={styles.filter} />
            </div>
            {
                filterDependents ? (
                <DependentTable 
                styles="margin-bottom: 40px;" 
                dependents={filterDependents} 
                paginationResetDefaultPage={resetPaginationToggle}
                handleShow={handleShow}
                setTypeModal={setTypeModal}
                setDependentSelect={setDependentSelect} />) 
                : 
                (<p>Cargando...</p>)
            }
        </>
    );
}

export default DependentPage;