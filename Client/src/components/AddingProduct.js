import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apipath from '../apipath';

export default function AddingProduct() {

  var x1 = useRef();
  var x2 = useRef();

  var navigate = useNavigate();
  var [apidata, setApidata] = useState([]);

  useEffect(() => {
    fetch(apipath + 'category-list')
      .then(res => res.json())
      .then(result => {
        setApidata(result);
      })
  }, [])
  var addingProduct = () => {
    var catID = x1.current.value;
    var proName = x2.current.value;
    if (catID != '' && proName != '') {
      fetch(apipath + 'product-list-add', {
        method: "POST",
        headers: new Headers(
          {
            'content-type': 'application/json'
          }
        ),
        body: JSON.stringify(
          {
            name: proName,
            catid: catID
          }
        )


      })
        .then(res => res.json())
        .then(result => {
          console.log(result)

          navigate('/product-list')
        })
    }
    else {
      alert('Please Enter Values')
    }


  }

  return (
    <div className='container'>
      <h1>Adding Product</h1>
      <select className='form-control' ref={x1}>
        <option value="">Please Select Category</option>
        {
          apidata && apidata.map(obj =>
            <option value={obj._id} >{obj.name}</option>
          )
        }
      </select>
      <br />
      <input type="text" class="form-control" ref={x2} />
      <br />

      <button onClick={addingProduct} className='btn btn-dark'>Add Product</button>


    </div>
  )
}
