import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function TableServices({ services, onSubmit }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [dataCountry, setDataCountry] = useState([])

  function getImage(image) {
    if (image) {
      return `https://api.appgpm.com/files/img/${image}`
    }
  }

  useEffect(() => {
    const countries = services.map((service) => service.enterprise.country.nombre)
    const uniqueCountries = [...new Set(countries)]
    setDataCountry(uniqueCountries)
  }, [services])


  function handleView(service) {
    Swal.fire({
      icon: 'info',
      title: service.nombre,
      text: service.descripcion,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#145388',
    })
  }

  function handleContact(service) {
    console.log(service)
    let email;
    let mensaje;

    Swal.fire({
      title: 'Contactar a la empresa: ' + service.nombre,
      html: `
            <div>
              <label style="margin-left:3em"> Email </label>
              <input type="email" id="email" class="swal2-input" style="width:100%"> 
            </div>
            <div style="margin-top: 2em">
              <label style="margin-left:3em"> Mensaje </label>
              <textarea id="mensaje" class="swal2-input" style="width:100%"></textarea>
            </div>`,
      confirmButtonText: 'Enviar',
      confirmButtonColor: '#145388',
      focusConfirm: false,
      preConfirm: () => {
        email = Swal.getPopup().querySelector('#email').value;
        mensaje = Swal.getPopup().querySelector('#mensaje').value;

        if (!email || !mensaje) {
          Swal.showValidationMessage(`Por favor complete todos los campos`);
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Una vez enviado no se podrá modificar',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#145388',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            const fd = new FormData();
            fd.append('email', email);
            fd.append('mensaje', mensaje);
            onSubmit(service?.enterprise?.id, fd);
          }
        });
      }
    });
  }



  return (
    <div className="tableDocuments p-1 table-responsive">
      <div className="search-container mb-3">
        <label htmlFor="countrySearch" className='form-label'>Buscar por país:</label>
        <select
          className="form-select"
          id="countrySearch"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Selecciona un país</option>
          {dataCountry.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Servicio</th>
            <th scope="col">Empresa</th>
            <th scope="col">País</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services
            .filter((service) =>
              selectedCountry === '' ||
              service.enterprise.country.nombre.toLowerCase().includes(selectedCountry.toLowerCase())
            )
            .map((service, index) => (
              <tr key={index}>
                <th scope="row">
                  <img className='imgService rounded' src={getImage(service?.enterprise?.avatar)} alt={service?.enterprise?.name} />
                </th>
                <td>{service?.nombre}</td>
                <td>{service?.enterprise?.razon_social}</td>
                <td>{service?.enterprise?.country?.nombre}</td>
                <td>{service?.enterprise?.telefono}</td>
                <td className='d-flex flex-column'>
                  <Link onClick={() => handleView(service)} className="btn btn-primary btn-sm mb-1">Ver descripción</Link>
                  <Link onClick={() => handleContact(service)} className="btn btn-secondary btn-sm">Contactar</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

  )
}