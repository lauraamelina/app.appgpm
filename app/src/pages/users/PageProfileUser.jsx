import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import * as UserService from '../../services/users.service'

import InfoByUser from '../../components/users/InfoByUser';
import MarketByUser from '../../components/users/MarketByUser';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function PageProfileUser() {
    const { id } = useParams();
    const [user, setUser] = useState([])
    const [productsByUser, setProductsByUser] = useState([])
    const [demandsByUser, setDemandsByUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setLoading(true)
        UserService.getUserById(id)
            .then((res) => {
                setUser(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setUser([])
                setLoading(false)
            })
        UserService.getProductsByUser(id)
            .then((res) => {
                setProductsByUser(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setProductsByUser([])
                setLoading(false)
            })
        UserService.getDemandsByUser(id)
            .then((res) => {
                setDemandsByUser(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setDemandsByUser([])
                setLoading(false)
            })
    }, [id])

    return (
        <main className='container userProfile'>
            <h1 className='visually-hidden'>Usuario: {user?.name}</h1>

            {!loading && !user?.name &&
                <div className="not-exist">
                    <p>El usuario no existe</p>
                    <Link to="/dashboard" className='btn btn-primary'>Ir al inicio</Link>
                </div>
            }

            {loading && (<div className="text-center"><CircularProgress /></div>)}

            {!loading && user?.name && (
                <section className="row">
                    <div className="col-md-4">
                        <InfoByUser user={user} />
                    </div>
                    <div className='col-md-8'>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Productos" {...a11yProps(0)} />
                                    <Tab label="Bids" {...a11yProps(1)} />
                                    <Tab label="Calificaciones" {...a11yProps(2)} />
                                </Tabs>
                            </Box>

                            <TabPanel value={value} index={0}>
                                <MarketByUser productsByUser={productsByUser} isProduct={true} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <MarketByUser productsByUser={demandsByUser} isProduct={false} />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                            </TabPanel>
                        </Box>
                    </div>
                </section>
            )}
        </main>
    )
}
