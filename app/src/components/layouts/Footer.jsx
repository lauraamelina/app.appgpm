import React, { useState }  from 'react'

export default function Footer() {
    // eslint-disable-next-line
    const [year, setYear] = useState(new Date().getFullYear())
    
    return (
        <footer>
            <div className="row">
                <div className="col-md-6 col-12">
                    <p className="text-center">{year} © Todos los derechos reservados Global Pulses Market SAS</p>
                </div>
                <div className="col-md-4 col-12">
                    <ul>
                        <li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/AppGPM/">Facebook</a></li>
                        <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/gpm-global-pulses-market-014a20198/">Linkedin</a></li>
                        <li><a target="_blank" rel="noreferrer" href="https://twitter.com/gpmLatam">Twitter</a></li>
                        <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/appgpm/">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}