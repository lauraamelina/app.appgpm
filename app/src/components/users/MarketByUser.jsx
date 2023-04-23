import React, { useState, useEffect } from 'react'
import CardMarketByUser from './CardMarketByUser'

export default function MarketByUser({ productsByUser }) {
    console.log(productsByUser)
    return (
        <div className='marketByUser'>
            {productsByUser?.map((product, index) => (
                <CardMarketByUser product={product} key={index} />
            ))}
        </div>
    )
}