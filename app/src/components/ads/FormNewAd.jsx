import React, { useState } from "react";
import ImgGenerica from '../../../src/assets/img/img_generica.png'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormNewAd({ dataCampaign, onSubmit }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [campaign_id, setCampaign_id] = useState('')
    const [banner, setBanner] = useState([])
    const [previewBanner, setPreviewBanner] = useState(ImgGenerica)

    function handleBanner(event) {
        const selectedFile = event.target.files[0];
        setBanner(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewBanner(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        } else {
            setPreviewBanner(null);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name === '' || description === '' || campaign_id === '' || banner === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
                confirmButtonColor: '#145388',
            })
            return;
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Una vez publicado no se podrá modificar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#145388',
                cancelButtonColor: '#d33',
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        const formData = new FormData();
                        formData.append('name', name);
                        formData.append('description', description);
                        formData.append('campaign_id', campaign_id);
                        formData.append('banner', banner);
                        onSubmit(campaign_id, formData)
                    }
                })
        }
    }

    return (
        <form>
            <div>
                <label htmlFor="name">Nombre</label>
                <input className="form-control" type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="description">Descripción</label>
                <textarea className="form-control" id="description" name="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>

            <div>
                <label htmlFor="campaign_id">Campaña</label>
                <select className="form-control" name="campaign_id" id="campaign_id" value={campaign_id} onChange={e => setCampaign_id(e.target.value)}>
                    <option value="">Selecciona una campaña</option>
                    {dataCampaign.map(campaign => (
                        <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="banner">Banner</label>
                <div className="banner">
                    <input className="form-control" type="file" id="banner" name="banner" onChange={handleBanner} accept=".png, .jpg, .jpeg" />
                    {previewBanner &&
                        <div className="img">
                            <img src={previewBanner} alt="Vista previa del banner" />
                        </div>
                    }
                </div>
            </div>

            <div className="d-flex justify-content-around">
                <Link to={'/dashboard/campaigns/ads/list'} className="btn btn-dark">Cancelar</Link>
                <button onClick={handleSubmit} className="btn btn-primary">Crear</button>
            </div>

        </form>
    )
}