import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apipath from '../apipath';

export default function ProActionDelete() {
    var { id } = useParams();
    var navigation = useNavigate();

    useEffect(() => {
        fetch(apipath + '/delete-product-list/' + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                console.log('response from delete product route');
                console.log(res)
                if (res['msg']) {
                    navigation('/product-list')
                }

            })
    }, [])
    return (
        <div></div>
    )
}
