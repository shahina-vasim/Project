import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apipath from '../apipath';

export default function ActionEditCategory() {

  var [name, setName] = useState('');
  let { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    fetch(apipath + 'category-list/' + id)
      .then(res => res.json())
      .then(val => {
        console.log(val);
        var { _id, name } = val;
        setName(name);
      })
  }, [])


  function updateRec(ev) {
    ev.preventDefault();
    var categoryName = name;

    fetch(apipath + 'update-category-list/' + id, {
      method: "PUT",
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(
        {
          name: categoryName
        }
      )
    })
      .then(res => res.json())
      .then(val => {
        console.log(val);
        if (val['msg']) {
          navigate('/category-list')
        }
      })
  }
  return (
    <div className='container'>
      <form onSubmit={updateRec}>
        <h1> Edit Category Page </h1>

        <input type="text" value={name} onChange={(ev) => { setName(ev.target.value) }} className='form-control' /> <br />
        <button >Update</button>
      </form>
    </div>
  )
}
