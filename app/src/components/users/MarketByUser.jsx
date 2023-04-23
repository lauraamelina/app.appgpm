import React from 'react'
import CardMarketByUser from './CardMarketByUser'
import CardBidByUser from './CardBidByUser'

export default function MarketByUser({ productsByUser, isProduct }) {
    return (
        <div className='marketByUser'>
            {isProduct && productsByUser.length !== 0 && productsByUser?.map((product, index) => (
                <CardMarketByUser product={product} key={index} />
            ))}
            {!isProduct && productsByUser.length !== 0 && productsByUser?.map((product, index) => (
                <CardBidByUser product={product} key={index} />
            ))}
            {productsByUser.length === 0 &&
                <div className='not-exist'>
                    <p className='fs-5'>El usuario no ha publicado {isProduct ? 'productos' : 'bids'} aún...</p>
                </div>
            }
        </div>
    )
}