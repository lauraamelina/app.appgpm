import React from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FolderIcon from '@mui/icons-material/Folder';
import UploadIcon from '@mui/icons-material/Upload';
import EmailIcon from '@mui/icons-material/Email';
import SummarizeIcon from '@mui/icons-material/Summarize';


export default function BtnTransactions() {
    return (
        <div className="btns-transactions">
            <button className='btn btn-primary'>
                Agregar secuencia
            </button>
            <button className="btn">
                <TrendingUpIcon />
                <span>Estado de la operación</span>
            </button>
            <button className="btn">
                <FolderIcon />
                <span>Archivos</span>
            </button>
            <button className="btn">
                <UploadIcon />
                <span>Subir archivos</span>
            </button>
            <button className="btn">
                <EmailIcon />
                <span>Servicios</span>
            </button>
            <button className="btn">
                <SummarizeIcon />
                <span>Servicios Conectados</span>
            </button>
        </div>
    )
}
