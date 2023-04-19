import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function ProductNewForm({ dataNombreProductos, dataCountries, dataIncoterms, onSubmit }) {
    const [isValidCountry, setIsValidCountry] = useState(false)
    const [thumbnail, setThumbnail] = useState([])
    const [video, setVideo] = useState([])
    const [galery, setGalery] = useState([])

    const [thumbnailPreview, setThumbnailPreview] = useState("")
    const [videoPreview, setVideoPreview] = useState("")
    const [galeryPreview, setGaleryPreview] = useState([])

    const [nombre_producto, setNombreProducto] = useState("")
    const [tipo1, setTipo1] = useState("")
    const [tipo2, setTipo2] = useState("")
    const [tipo3, setTipo3] = useState("")
    const [clasificacion, setClasificacion] = useState("")
    const [danos_totales, setDanosTotales] = useState("")
    const [blanqueados, setBlanqueados] = useState("")
    const [granos_fuera_tipo, setGranosFueraTipo] = useState("")
    const [granos_partidos, setGranosPartidos] = useState("")
    const [materias_extranos, setMateriasExtranos] = useState("")
    const [insectos_vivos, setInsectosVivos] = useState("")
    const [humedad, setHumedad] = useState("")
    const [granos_decolorados, setGranosDecolorados] = useState("")
    const [anos_produccion, setAnosProduccion] = useState("")
    const [country, setCountry] = useState("")
    const [plazo_carga, setPlazoCarga] = useState("")
    const [mercaderia, setMercaderia] = useState("")
    const [estado, setEstado] = useState("")
    const [peso, setPeso] = useState("")
    const [volumen, setVolumen] = useState("")
    const [incoterm, setIncoterm] = useState("")
    const [puerto, setPuerto] = useState("")
    const [precio, setPrecio] = useState("")

    const [tam_mil_menor_4, setMilMenor4mm] = useState(0)
    const [tam_mil_4, setMil4] = useState(0)
    const [tam_mil_5, setMil5] = useState(0)
    const [tam_mil_6, setMil6] = useState(0)
    const [tam_mil_7, setMil7] = useState(0)
    const [tam_mil_8, setMil8] = useState(0)
    const [tam_mil_9, setMil9] = useState(0)
    const [tam_mil_10, setMil10] = useState(0)
    const [tam_mil_11, setMil11] = useState(0)
    const [tam_mil_12, setMil12] = useState(0)
    const [total_milimetros, setTotalMilimetros] = useState(0)

    const [cal_menos160, setCalMenos160] = useState(0)
    const [cal_menos160_180, setCalMenos160_180] = useState(0)
    const [cal_menos180_190, setCalMenos180_190] = useState(0)
    const [cal_menos191_200, setCalMenos191_200] = useState(0)
    const [cal_menos201_210, setCalMenos201_210] = useState(0)
    const [cal_menos211_220, setCalMenos211_220] = useState(0)
    const [cal_menos221_230, setCalMenos221_230] = useState(0)
    const [cal_menos231_240, setCalMenos231_240] = useState(0)
    const [cal_mayor240, setCalMayor240] = useState(0)
    const [total_calibres, setTotalCalibre] = useState(0)

    const datatipo1 = [
        { id: '1', name: 'Organico' },
        { id: '2', name: 'Convencional' }
    ];
    const datatipo2 = [
        { id: '1', name: 'Granos Enteros' },
        { id: '2', name: 'Granos Partidos' }
    ];
    const datatipo3 = [
        { id: '1', name: 'Natural' },
        { id: '2', name: 'Procesado' }
    ];
    const datadanos_totales = [
        { id: '1', name: '0-0.5%' },
        { id: '2', name: '0.5-1%' },
        { id: '3', name: '1-1.5%' },
        { id: '4', name: '1.5-2%' },
        { id: '5', name: '2-4%' },
        { id: '6', name: '4-6%' }
    ];
    const datablanqueados = [
        { id: '1', name: '0,2%' },
        { id: '2', name: '2-5%' },
        { id: '1', name: 'MAYOR DE 5%' },
    ];
    const datagranos_fuera_tipo = [
        { id: '1', name: '0-0.5%' },
        { id: '2', name: '0.5-1%' },
        { id: '3', name: '1-1.5%' },
        { id: '4', name: '1.5-2%' },
        { id: '5', name: '2-4%' },
        { id: '6', name: '4-6%' }
    ];
    const datagranos_partidos = [
        { id: '1', name: '0-0.5%' },
        { id: '2', name: '0.5-1%' },
        { id: '3', name: '1-1.5%' },
        { id: '4', name: '1.5-2%' },
        { id: '5', name: '2-4%' },
        { id: '6', name: 'MAYOR DE 4%' }
    ];
    const datamaterias_extranos = [
        { id: '1', name: '0-0.5%' },
        { id: '2', name: '0.5-1%' },
        { id: '3', name: '1-1.5%' },
        { id: '4', name: '1.5-2%' },
        { id: '5', name: '2-4%' },
        { id: '6', name: 'MAYOR DE 4%' }
    ];
    const datahumedad = [
        { id: '1', name: 'MENOS DE 8' },
        { id: '2', name: '9-10' },
        { id: '3', name: '11-12' },
        { id: '4', name: '12-13' },
        { id: '5', name: '13-14' },
        { id: '6', name: 'MAYOR DE 14' }
    ];
    const datagranos_decolorados = [
        { id: '1', name: 'MENOR DE 5%' },
        { id: '2', name: 'MAYOR DE 5%' },
    ];
    const dataanos_produccion = [
        { id: '1', name: 2015 },
        { id: '2', name: 2016 },
        { id: '1', name: 2017 },
        { id: '2', name: 2018 },
        { id: '1', name: 2019 },
        { id: '2', name: 2020 },
        { id: '1', name: 2021 }
    ];
    const datamercaderia = [
        { id: '1', name: 'BIG BAG 1000KG' },
        { id: '2', name: 'BOLSA 20KG' },
        { id: '1', name: 'BOLSA 25KG' },
        { id: '1', name: 'BOLSA 40KG' },
        { id: '2', name: 'BOLSA 50KG' }
    ];
    const dataestado = [
        { id: '1', name: 'Activo' },
        { id: '2', name: 'Inactivo' }
    ];
    const dataplazo_carga = [
        { id: '1', name: 'Inmediata' },
        { id: '2', name: '5-30 días' },
        { id: '1', name: 'Mayor 30 días' }
    ];
    const datapeso = [
        { id: '2', name: 'TONELADAS' }
    ];

    function handleSubmit(e) {
        e.preventDefault()
        if (nombre_producto !== "" && tipo1 !== "" && tipo2 !== "" && tipo3 !== "" && clasificacion !== "" && danos_totales !== "" && blanqueados !== "" && granos_fuera_tipo !== "" && granos_partidos !== "" && materias_extranos !== "" && insectos_vivos !== "" && humedad !== "" && granos_decolorados !== "" && anos_produccion !== "" && country !== "" && plazo_carga !== "" && mercaderia !== "" && estado !== "" && peso !== "" && volumen !== "" && incoterm !== "" && puerto !== "" && precio !== "" && thumbnail !== []) {
           
            const fd = new FormData();
            fd.append('nombre_producto', nombre_producto);
            fd.append('tipo1', tipo1);
            fd.append('tipo2', tipo2);
            fd.append('tipo3', tipo3);
            fd.append('clasificacion', clasificacion);
            fd.append('danos_totales', danos_totales);
            fd.append('blanqueados', blanqueados);
            fd.append('granos_fuera_tipo', granos_fuera_tipo);
            fd.append('granos_partidos', granos_partidos);
            fd.append('materias_extranos', materias_extranos);
            fd.append('insectos_vivos', insectos_vivos);
            fd.append('humedad', humedad);
            fd.append('granos_decolorados', granos_decolorados);
            fd.append('anos_produccion', anos_produccion);
            fd.append('country', country);
            fd.append('plazo_carga', plazo_carga);
            fd.append('mercaderia', mercaderia);
            fd.append('estado', estado);
            fd.append('peso', peso);
            fd.append('volumen', volumen);
            fd.append('incoterm', incoterm);
            fd.append('puerto', puerto);
            fd.append('precio', precio);
            if (clasificacion === 'calibre') {
                fd.append('cal_mayor240', cal_mayor240);
                fd.append('cal_menos160_180', cal_menos160_180);
                fd.append('cal_menos180_190', cal_menos180_190);
                fd.append('cal_menos191_200', cal_menos191_200);
                fd.append('cal_menos201_210', cal_menos201_210);
                fd.append('cal_menos211_220', cal_menos211_220);
                fd.append('cal_menos221_230', cal_menos221_230);
                fd.append('cal_menos231_240', cal_menos231_240);
                fd.append('total_calibres', total_calibres);
            }
            if (clasificacion === 'milimetros') {
                fd.append('tam_mil_menor_4', tam_mil_menor_4);
                fd.append('tam_mil_4', tam_mil_4);
                fd.append('tam_mil_5', tam_mil_5);
                fd.append('tam_mil_6', tam_mil_6);
                fd.append('tam_mil_7', tam_mil_7);
                fd.append('tam_mil_8', tam_mil_8);
                fd.append('tam_mil_9', tam_mil_9);
                fd.append('tam_mil_10', tam_mil_10);
                fd.append('tam_mil_11', tam_mil_11);
                fd.append('tam_mil_12', tam_mil_12);
                fd.append('total_milimetros', total_milimetros);
            }

            if (thumbnail) {
                fd.append('thumbnail', thumbnail);
            }
            if (galery) {
                fd.append('gallery', 'true');
                fd.append('gallery_size', `${galery.length}`);
                for (let i = 0; i < galery.length; i++) {
                    let key = 'gallery-' + i + 1;
                    fd.append(key, galery[i]);
                }
            }
            if (video) {
                fd.append('video', video);
            }
            onSubmit(fd);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Completa todos los datos',
                confirmButtonColor: '#145388',
            })
        }
    }

    const validOptionsPais = dataCountries?.data?.map((country) => country.id) || [];
    useEffect(() => {
        const selectedCountryId = country;
        if (selectedCountryId) {
            const isValid = validOptionsPais.includes(parseInt(selectedCountryId));
            setIsValidCountry(isValid);
        }
        // eslint-disable-next-line
    }, [country, setIsValidCountry]);

    function handleThumbnailPreview(event) {
        const selectedFile = event.target.files[0];
        setThumbnail(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        } else {
            setThumbnailPreview(null);
        }
    }

    const handleGalery = (event) => {
        const files = event.target.files;
        setGalery(event.target.files[0]);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onloadend = () => {
                setGaleryPreview((prevPreviewGaleria) => [...prevPreviewGaleria, { file: file, preview: reader.result, },]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideo = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideo(file);
            const reader = new FileReader();
            reader.onload = () => {
                setVideoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setVideo(null);
            setVideoPreview(null);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="formNewProduct" encType="multipart/form-data">
            <h2>Información del producto - Complete la información</h2>
            <div>
                <div className="form-group">
                    <label className="visually-hidden" htmlFor="nombre_producto">Nombre del producto</label>
                    <select className="form-control" id="nombre_producto" defaultValue={nombre_producto}
                        onChange={(e) => setNombreProducto(e.target.value)}>
                        <option value="" disabled>Selecciona el nombre del producto</option>
                        {dataNombreProductos && dataNombreProductos?.data?.map((producto) => {
                            return <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                        })}
                    </select>
                </div>

                <div className="form-group tipe">
                    <div>
                        <label className="visually-hidden" htmlFor="tipo1">Tipo 1</label>
                        <select className="form-control" id="tipo1" defaultValue={tipo1}
                            onChange={(e) => setTipo1(e.target.value)}>
                            <option value="" disabled>Selecciona el tipo</option>
                            {datatipo1 && datatipo1?.map((tipo) => {
                                return <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <label className="visually-hidden" htmlFor="tipo2">Tipo 2</label>
                        <select className="form-control" id="tipo2" defaultValue={tipo2}
                            onChange={(e) => setTipo2(e.target.value)}>
                            <option value="" disabled>Selecciona el tipo</option>
                            {datatipo2 && datatipo2?.map((tipo) => {
                                return <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <label className="visually-hidden" htmlFor="tipo3">Tipo 3</label>
                        <select className="form-control" id="tipo3" defaultValue={tipo3}
                            onChange={(e) => setTipo3(e.target.value)}>
                            <option value="" disabled>Selecciona el tipo</option>
                            {datatipo3 && datatipo3?.map((tipo) => {
                                return <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                            })}
                        </select>
                    </div>



                </div>

                <div className="clasificacion">
                    <label htmlFor="clasificacion">Clasificación del producto</label>
                    <div className="form-check form-group">
                        <div>
                            <input className="form-check-input" type="radio" name="clasificacion" id="clasificacion1" value="milimetros"
                                onChange={(e) => setClasificacion(e.target.value)} />
                            <label className="form-check-label" htmlFor="clasificacion1">
                                Tamaño Milímetros
                            </label>
                        </div>
                        <div>
                            <input className="form-check-input" type="radio" name="clasificacion" id="clasificacion2" value="calibres"
                                onChange={(e) => setClasificacion(e.target.value)} />
                            <label className="form-check-label" htmlFor="clasificacion2">
                                Calibres
                            </label>
                        </div>
                        <div>
                            <input className="form-check-input" type="radio" name="clasificacion" id="clasificacion3" value="na" onChange={(e) => setClasificacion(e.target.value)} />
                            <label className="form-check-label" htmlFor="clasificacion3">
                                No aplica
                            </label>
                        </div>
                    </div>
                </div>

                {clasificacion === "milimetros" && (
                    <div className="container mm">
                        <div className="row">
                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_menor_4 "> Menos de 4mm</label>
                                <input type="number" className="form-control" id="tam_mil_menor_4" name="tam_mil_menor_4"  value={tam_mil_menor_4} onChange={(e) => setMilMenor4mm(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_4 ">4mm</label>
                                <input type="number" className="form-control" id="tam_mil_4" name="tam_mil_4 " value={tam_mil_4} onChange={(e) => setMil4(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_5">5mm</label>
                                <input type="number" className="form-control" id="tam_mil_5" name="tam_mil_5" value={tam_mil_5} onChange={(e) => setMil5(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_6">6mm</label>
                                <input type="number" className="form-control" id="tam_mil_6" name="tam_mil_6" value={tam_mil_6} onChange={(e) => setMil6(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_7">7mm</label>
                                <input type="number" className="form-control" id="tam_mil_7" name="tam_mil_7" value={tam_mil_7} onChange={(e) => setMil7(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_8">8mm</label>
                                <input type="number" className="form-control" id="tam_mil_8" name="tam_mil_8" value={tam_mil_8} onChange={(e) => setMil8(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_9">9mm</label>
                                <input type="number" className="form-control" id="tam_mil_9" name="tam_mil_9" value={tam_mil_9} onChange={(e) => setMil9(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_10">10mm</label>
                                <input type="number" className="form-control" id="tam_mil_10" name="tam_mil_10" value={tam_mil_10} onChange={(e) => setMil10(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_11">11mm</label>
                                <input type="number" className="form-control" id="tam_mil_11" name="tam_mil_11" value={tam_mil_11} onChange={(e) => setMil11(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="tam_mil_12">12mm</label>
                                <input type="number" className="form-control" id="tam_mil_12" name="tam_mil_12" value={tam_mil_12} onChange={(e) => setMil12(e.target.value)} />
                            </div>

                            <div className="col-4 mt-3">
                                <label htmlFor="total_milimetros">Total del porcentaje </label>
                                <input type="number" className="form-control" id="total_milimetros" name="total_milimetros" value={total_milimetros} onChange={(e) => setTotalMilimetros(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {clasificacion === "calibres" && (
                    <div className="container mm">
                        <div className="row">
                            <div className="col-2 mt-3">
                                <label htmlFor="cal_menos160">{'< 160/100'}</label>
                                <input type="number" className="form-control" id="cal_menos160" name="cal_menos160" value={cal_menos160} onChange={(e) => setCalMenos160(e.target.value)} />
                            </div>
                            <div className="col-2 mt-3">
                                <label htmlFor="cal_menos160_180">{'< 160-180/100'}</label>
                                <input type="number" className="form-control" id="cal_menos160_180" name="cal_menos160_180" value={cal_menos160_180} onChange={(e) => setCalMenos160_180(e.target.value)} />
                            </div>
                            <div className="col-2 mt-3">
                                <label htmlFor="cal_menos180_190">{'< 180-190/100'}</label>
                                <input type="number" className="form-control" id="cal_menos180_190" name="cal_menos180_190" value={cal_menos180_190} onChange={(e) => setCalMenos180_190(e.target.value)} />
                            </div>
                            <div className="col-2 mt-3">
                                <label htmlFor="cal_menos191_200">{'< 191-200/100'}</label>
                                <input type="number" className="form-control" id="cal_menos191_200" name="cal_menos191_200" value={cal_menos191_200} onChange={(e) => setCalMenos191_200(e.target.value)} />
                            </div>
                            <div className="col-2 mt-3">
                                <label htmlFor="cal_menos201_210">{'< 201/210-100'}</label>
                                <input type="number" className="form-control" id="cal_menos201_210" name="cal_menos201_210" value={cal_menos201_210} onChange={(e) => setCalMenos201_210(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="cal_menos211_220">{'< 211/220-100'}</label>
                                <input type="number" className="form-control" id="cal_menos211_220" name="cal_menos211_220" value={cal_menos211_220} onChange={(e) => setCalMenos211_220(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="cal_menos221_230">{'< 211/230-100'}</label>
                                <input type="number" className="form-control" id="cal_menos221_230" name="cal_menos221_230" value={cal_menos221_230} onChange={(e) => setCalMenos221_230(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="cal_menos231_240">{'< 231/240-100'}</label>
                                <input type="number" className="form-control" id="cal_menos231_240" name="cal_menos231_240" value={cal_menos231_240} onChange={(e) => setCalMenos231_240(e.target.value)} />
                            </div>

                            <div className="col-2 mt-3">
                                <label htmlFor="cal_mayor240">{'> 240/100'} </label>
                                <input type="number" className="form-control" id="cal_mayor240" name="cal_mayor240" value={cal_mayor240} onChange={(e) => setCalMayor240(e.target.value)} />
                            </div>

                            <div className="col-6 mt-3">
                                <label htmlFor="total_calibres">Total del porcentaje </label>
                                <input type="number" className="form-control" id="total_calibres" name="total_calibres" value={total_calibres} onChange={(e) => setTotalCalibre(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="container caracteristicas">
                    <h2>Características del Producto</h2>
                    <div className="row justify-content-between">
                        <div className="col-3 mt-3">
                            <label htmlFor="danos_totales">Daños Totales</label>
                            <select className="form-select" id="danos_totales" name="danos_totales" value={danos_totales} onChange={(e) => setDanosTotales(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datadanos_totales?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <label htmlFor="blanqueados">Blanqueados</label>
                            <select className="form-select" id="blanqueados" name="blanqueados" value={blanqueados} onChange={(e) => setBlanqueados(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datablanqueados?.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <label htmlFor="granos_fuera_tipo">Granos fuera de tipo</label>
                            <select className="form-select" id="granos_fuera_tipo" name="granos_fuera_tipo" value={granos_fuera_tipo} onChange={(e) => setGranosFueraTipo(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datagranos_fuera_tipo?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <label htmlFor="granos_partidos">Granos Partidos</label>
                            <select className="form-select" id="granos_partidos" name="granos_partidos" value={granos_partidos} onChange={(e) => setGranosPartidos(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datagranos_partidos?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <label htmlFor="materias_extranos"> Materiales Extraños </label>
                            <select className="form-select" id="materias_extranos" name="materias_extranos" value={materias_extranos} onChange={(e) => setMateriasExtranos(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datamaterias_extranos?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <label htmlFor="insectos_vivos">Insectos Vivos</label>
                            <input type="number" className="form-control" id="insectos_vivos" name="insectos_vivos" value={insectos_vivos} onChange={(e) => setInsectosVivos(e.target.value)} />
                        </div>
                        <div className="col-3 mt-3">
                            <label htmlFor="humedad">Humedad</label>
                            <select className="form-select" id="humedad" name="humedad" value={humedad} onChange={(e) => setHumedad(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {/* recorre datahumedad */}
                                {datahumedad?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-3 mt-3">
                            <label htmlFor="granos_decolorados">Granos Decolorados</label>
                            <select className="form-select" id="granos_decolorados" name="granos_decolorados" value={granos_decolorados} onChange={(e) => setGranosDecolorados(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datagranos_decolorados?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-auto mt-3">
                            <label htmlFor="anos_produccion">Año de Producción</label>
                            <select className="form-select" id="anos_produccion" name="anos_produccion" value={anos_produccion} onChange={(e) => setAnosProduccion(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {dataanos_produccion?.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-auto mt-3">
                            <label htmlFor="country">País</label>
                            <input className="form-select" list="countryList" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Selecciona el país" />
                            <datalist id="countryList">
                                {dataCountries?.data?.map((country) => (
                                    <option key={country.id} value={country.id}>{country.nombre}</option>
                                ))}
                            </datalist>
                            {!isValidCountry && (
                                <div className="invalid">
                                    Ingrese un país correcto
                                </div>
                            )}
                        </div>
                        <div className="col-auto mt-3">
                            <label htmlFor="plazo_carga">Plazo de carga</label>
                            <select className="form-select" id="plazo_carga" name="plazo_carga" value={plazo_carga} onChange={(e) => setPlazoCarga(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {dataplazo_carga?.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-auto mt-3">
                            <label htmlFor="mercaderia">Mercadería</label>
                            <select className="form-select" id="mercaderia" name="mercaderia" value={mercaderia} onChange={(e) => setMercaderia(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datamercaderia?.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-auto mt-3">
                            <label htmlFor="estado">Estado</label>
                            <select className="form-select" id="estado" name="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {dataestado?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container caracteristicas mt-5">
                    <h2>Precio del producto</h2>
                    <div className="row justify-content-between">
                        <div className="col-auto mt-3">
                            <label htmlFor="peso">Peso</label>
                            <select className="form-select" id="peso" name="peso" value={peso} onChange={(e) => setPeso(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {datapeso?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-auto mt-3">
                            <label htmlFor="volumen">Volumen</label>
                            <input type="number" className="form-control" id="volumen" name="volumen" value={volumen} onChange={(e) => setVolumen(e.target.value)} />
                        </div>

                        <div className="col-auto mt-3">
                            <label htmlFor="incoterm">Incoterms</label>
                            <select className="form-select" id="incoterm" name="incoterm" value={incoterm} onChange={(e) => setIncoterm(e.target.value)}>
                                <option value={""}>Seleccionar</option>
                                {dataIncoterms?.data?.map((incoterm) => (
                                    <option key={incoterm.id} value={incoterm.id}>{incoterm.nombre}</option>
                                ))}

                            </select>
                        </div>

                        <div className="col-auto mt-3">
                            <label htmlFor="puerto">Puerto de carga</label>
                            <input type="text" className="form-control" id="puerto" name="puerto" value={puerto} onChange={(e) => setPuerto(e.target.value)} />
                        </div>

                        <div className="col-auto mt-3">
                            <label htmlFor="precio">Precio</label>
                            <input type="number" className="form-control" id="precio" name="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        </div>

                    </div>
                </div>

                <div className="container caracteristicas mt-5">
                    <h2>Imágenes del producto</h2>
                    <div className="row justify-content-between">
                        <div className="col-md-4 mt-3">
                            <label htmlFor="thumbnail">Imagen principal (Obligatorio)</label>
                            <input type="file" className="form-control" id="thumbnail" name="thumbnail" onChange={handleThumbnailPreview} accept=".png, .jpg, .jpeg" />

                            {thumbnailPreview && (
                                <div className="img">
                                    <img src={thumbnailPreview} alt="Preview" />
                                </div>
                            )}
                        </div>

                        <div className="col-md-4 mt-3">
                            <label htmlFor="galeria">Galería</label>
                            <input type="file" className="form-control" id="galeria" name="galeria" onChange={handleGalery} accept=".png, .jpg, .jpeg" multiple />
                            <div className="galery">
                                {galeryPreview?.map((item, index) => (
                                    <img key={index} src={item.preview} alt={item.file.name} />
                                ))}
                            </div>
                        </div>

                        <div className="col-md-4 mt-3">
                            <label htmlFor="video">Video</label>
                            <input type="file" className="form-control" id="video" name="video" onChange={handleVideo} accept="video/*" />
                            {videoPreview && (
                                <video width="320" height="240" controls>
                                    <source src={videoPreview} type="video/mp4" />
                                </video>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="col-3 align-self-center text-center">
                        <Link className="btn btn-danger w-100" to={'dashboard/products/list'} >Cancelar</Link>
                    </div>
                    <div className="col-3 align-self-center text-center">
                        <button className="btn btn-primary w-100" type="submit">Agregar</button>
                    </div>
                </div>
            </div>

        </form>

    )
}