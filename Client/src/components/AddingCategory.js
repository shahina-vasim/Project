import React, { useState } from 'react'
import apipath from '../apipath';
import { useNavigate } from 'react-router-dom';

export default function AddingCategory() {
  var [catname, setcatname] = useState('');
  var [error, setError] = useState('');
  var navigate = useNavigate();
  var addingCateogry = (event) => {
    event.preventDefault();
    if (catname == '') {
      setError('please Eneter Category Name')
    }
    else {
      fetch(apipath + 'category-list-add', {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
          name: catname
        })
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)
          setError('record added in database')
          navigate('/category-list')
        }

        )
    }
  }

  var categoryvalue = (event) => {
    setcatname(event.target.value)
    console.log('test')

  }
  return (
    <div className='container'>
      <h1>AddingCategory</h1>

      <form onSubmit={addingCateogry}>

        <div class="row">
          <div class="col">
            <input type="text" class="form-control" onChange={categoryvalue} />
          </div>
          <div class="col">
            <button className='btn btn-primary'>Category-Adding</button>
            <p>{error}</p>
          </div>
        </div>
      </form>

    </div>
  )
}







