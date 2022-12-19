import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apipath from '../apipath';

export default function CatActionDelete() {
  var { id } = useParams();
  var navigate = useNavigate();

  useEffect(() => {

    fetch(apipath + 'delete-category-list/' + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        console.log("DELETE CATEGORY")
        console.log(result)
        if (result['msg']) {
          navigate('/category-list');
        }
      })
  }, [])
  return (
    <></>
  )
}