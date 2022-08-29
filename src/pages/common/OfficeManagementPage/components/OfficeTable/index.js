import DataTable from 'react-data-table-component';
import { Button, Badge } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import styles from './OfficeTable.module.css';

// Opciones de paginación
const paginationOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

// Estilos personalizados
const customStyles = {
    headRow: {
        style: {
			backgroundColor: "#002855",
		}
    },
    cells: {
        style: {
            textAlign: 'center',
        }
    }
}

const OfficeTable = ({offices, setOfficeSelect, handleShow, paginationResetDefaultPage}) => {
    // Columnas de la tabla
    const columns = [
        {
            name: <div className={styles.container_table_header}><h6>Consultorio</h6></div>,
            selector: row => row.officeName,
            sortable: true,
            center: true,
            wrap: true,
            width: "150px"
        },
        {
            name: <div className={styles.container_table_header}><h6>Dirección</h6></div>,
            selector: row => row.address,
            wrap: true,
            center: true,
            width: "250px"
        },
        {
            name: <div className={styles.container_table_header}><h6>Teléfono</h6></div>,
            selector: row => row.cellPhone,
            wrap: true,
            center: true,
            Width: "100px",
        },
        {
            name: <div className={styles.container_table_header}><h6>Estado</h6></div>,
            selector: row => 
                <div className={styles.badge_text}>
                    <Badge pill bg={row.isDeleted === false ? 'success' : 'danger'}>
                        {row.isDeleted === false ? 'ACTIVO' : 'INACTIVO' }
                    </Badge>
                </div>,
            center: true,
            wrap: true,
            Width: "120px",
        },
        {
            name: <div className={styles.container_table_header}><h6>Acciones</h6></div>,
            cell: (row) => {
                return (
                    <div className={styles.container_actions}>
                        <Button 
                        className={styles.button_edit} 
                        onClick={() => {
                            setOfficeSelect(row);
                            handleShow();
                        }}>
                            <FaEdit />
                        </Button>
                    </div>
                )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true,
            Width: "120px"
        }
    ];

    return (
        <div className={styles.container_datable}>
            <DataTable
            className={styles.rdt_TableHeadRow}
            columns={columns}
            data={offices}
            pagination
            highlightOnHover={true}
            wrap={true}
            noDataComponent="No existen consultorios registrados"
            fixedHeader
            fixedHeaderScrollHeight="600px"
            paginationComponentOptions={paginationOptions}
            paginationResetDefaultPage={paginationResetDefaultPage}
            customStyles={customStyles}
            />
        </div>
    );
}

export default OfficeTable;
