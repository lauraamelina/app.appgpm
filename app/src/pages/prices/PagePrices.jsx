import React, { useState, useEffect } from "react";
import * as DashboardService from '../../services/dashboard.service'
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Swal from "sweetalert2";

const theme = createTheme({
    typography: {
        fontFamily: 'Nunito, sans-serif',
    },
});
export default function PagePrices() {
    const [items, setItems] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([])

    function addPrice(product) {
        const lastMonth = parseInt(product.promedios_venta[product.promedios_venta.length - 1]?.month || 0);
        
        Swal.fire({
            title: 'Agregar Precio (' + product.nombre + ')',
            html: `
                <label for="precio">Precio:</label>
                <input type="number" id="precio" class="swal2-input" required>
                <input type="hidden" id="mes" value="${lastMonth + 1}" readonly>
                <p style="margin-top: 1rem;">Mes: ${lastMonth + 1}</p>
            `,
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#145388',
            preConfirm: () => {
                const precio = Swal.getPopup().querySelector('#precio').value;
                const mes = Swal.getPopup().querySelector('#mes').value;
                if (!precio) {
                    Swal.showValidationMessage('Por favor ingrese el precio.');
                }
                return { precio, mes };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const newPrice = {
                    month: parseInt(result.value.mes),
                    price: parseFloat(result.value.precio),
                };

                // Envía la nueva información a tu API o servicio
                // Actualiza el estado si es necesario
                console.log('Nuevo Precio:', newPrice);
            }
        });
    }


    useEffect(() => {
        setLoading(true);
        DashboardService.getFobData()
            .then((res) => {
                setItems(res);
                setLoading(false);
            })
            .catch((err) => {
                setItems([]);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        if (Object.keys(items).length > 0) {
            const filteredItems = items.promedio.filter(product =>
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(filteredItems);
        }
    }, [items, searchTerm]);


    useEffect(() => {
        if (Object.keys(items).length > 0) {
            for (let i = 0; i < Object.keys(items.promedio).length; i++) {
                let promedios = [];
                for (
                    let j = 0;
                    j < Object.keys(items.promedio[i].promedios_venta).length;
                    j++
                ) {
                    promedios = [
                        ...promedios,
                        {
                            name: items.promedio[i].promedios_venta[j].month,
                            precio: items.promedio[i].promedios_venta[j].price,
                        },
                    ];
                }

                const existingProduct = data.find(
                    (product) => product.id === items.promedio[i].id
                );
                if (!existingProduct) {
                    setData((data) => [
                        ...data,
                        {
                            nombre: items.promedio[i].nombre,
                            id: items.promedio[i].id,
                            promedios: promedios,
                            venta: items.promedio[i].promedio_venta_actual?.price,
                        },
                    ]);
                }
            }
        }
        // eslint-disable-next-line
    }, [items]);



    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <ThemeProvider theme={theme}>
            <main className="container">
                <h1>Precios</h1>
                <TextField
                    label="Buscar por nombre"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">🔍</InputAdornment>
                        ),
                    }}
                    style={{ marginBottom: '1rem' }}
                />
                {loading ? (
                    <div className="text-center">
                        <CircularProgress />
                    </div>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Venta Actual</TableCell>
                                    <TableCell>Promedios por Mes</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredItems?.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.nombre}</TableCell>
                                        <TableCell>{product.promedio_venta_actual?.price}</TableCell>
                                        <TableCell>
                                            <ul>
                                                {product.promedios_venta.map((precio, index) => (
                                                    <li key={index}>Mes {index + 1}: {precio.price}</li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                        <TableCell>
                                            <button onClick={() => addPrice(product)} className="btn btn-primary">
                                                Agregar valor
                                            </button>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </main>
        </ThemeProvider>
    )
}
