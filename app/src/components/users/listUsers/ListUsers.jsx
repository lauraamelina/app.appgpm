import React, { useEffect, useState } from 'react';
import * as CountriesService from '../../../services/countries.service'
import CardUser from './CardUser'
import { Link } from 'react-router-dom';
import { utils, writeFile } from 'xlsx';


export default function ListUsers({ users, deleteUser }) {
    const [search, setSearch] = useState('')
    const [usersWithCountry, setUsersWithCountry] = useState([])
    const [usersFilter, setUsersFilter] = useState(usersWithCountry)
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(9);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersFilter.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportToExcel = () => {
        const data = usersFilter.map((user) => ({
            ID: user.id,
            Nombre: user.name,
            Email: user.email,
            País: user.country,
            Rol: user.rol === 1 ? 'Administrador' : 'Vendedor/Comprador',
            NIT: user.nit,
            Direccion: user.direccion,
            Verificado: user.verificado === 0 ? 'No verificado' : 'Verificado'
        }));
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Usuarios');
        writeFile(wb, 'usuarios.xlsx');
    };

    const paginateNext = () => {
        if (currentPage < users?.length / usersPerPage) {
            paginate(currentPage + 1);
        }
    }
    const paginatePrev = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        const filter = usersWithCountry.filter((item) => {
            return item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.slug.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.email.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setUsersFilter(filter)
        setCurrentPage(1);
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [usersFilter])




    useEffect(() => {
        CountriesService.getCountries()
            .then((res) => {
                const countries = res.data
                const usersWithCountry = users.map((user) => {
                    const country = countries.find((item) => item.id === user.pais_id)
                    return { ...user, country: country?.nombre }
                })
                setUsersWithCountry(usersWithCountry)
                setUsersFilter(usersWithCountry);
            })

    }, [users])


    const onDelete = (id) => {
        deleteUser(id)
        setSearch('')
    }

    return (
        <div className='container listUser'>
            <div className='row'>
                <div className='col-md-12 header'>
                    <Link to={'/dashboard/users/new'} className='btn btn-primary'> Agregar nuevo usuario</Link>

                    <div className="search">
                        <label htmlFor="search">Buscar </label>
                        <input className='form-control' type="text" name="search" id="search" value={search} onChange={handleSearch} />
                    </div>
                    <button className='btn btn-success' onClick={exportToExcel}>Exportar a Excel</button>

                </div>
                {currentUsers.length !== 0 && currentUsers.map((user) => (
                    <div className='col-md-4' key={user.id}>
                        <CardUser user={user} onDelete={onDelete} />
                    </div>
                ))}

                {currentUsers.length === 0 &&
                    <div className='not-exist'>
                        <h2>No existen usuarios con esos parámetros</h2>
                    </div>
                }
            </div>
            {currentUsers.length !== 0 &&
                <>
                    <p>Página {currentPage} de {Math.ceil(usersFilter?.length / usersPerPage)}</p>

                    {usersFilter?.length > usersPerPage && (
                        <div className="pagination">
                            <button onClick={paginatePrev} className="btn btn-primary">Anterior</button>
                            <button onClick={paginateNext} className="btn btn-primary">Siguiente</button>
                        </div>
                    )}
                </>
            }
        </div>





    )
}