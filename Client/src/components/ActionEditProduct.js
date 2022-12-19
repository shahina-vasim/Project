import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apipath from '../apipath';

export default function ActionEditProduct() {
  var { id } = useParams();
  var [category, setCategory] = useState([])
  var [product, setProduct] = useState({});
  var a1 = useRef();
  var navigate = useNavigate();

  useEffect(() => {
    fetch(apipath + 'product-category-list/' + id)
      .then(val => {
        console.log(val);
        setCategory(val['CategoryRecord']);
        setProduct(val['ProductRecord']);
      });

  }, [])

  var updateProduct = (event) => {
    event.preventDefault();
    fetch(apipath + `update-product-list/${id}`, {
      method: "PUT",
      headers: new Headers(
        {
          'content-type': 'application/json'
        }
      ),
      body: JSON.stringify(
        {
          name: product,
          catid: a1.current.value
        }
      )
    })
      .then(res => res.json())
      .then(answer => {
        console.log(answer);
        navigate('/product-list')
      })


  }
  return (
    <div className='container'>

      <form onSubmit={updateProduct}>
        <h1>Edit Product page,</h1>
        <select className='form-control' ref={a1}>
          <option value=''>
            please select category

          </option>
          {
            category && category.map(obj =>
              <option value={obj._id}>
                {obj.name}
              </option>
            )
          }

        </select>

        <br />
        <input type='text' value={product.name} onChange={(event) => { setProduct(event.target.value) }} className='form-control' /><br />
        <button>update</button>

      </form>


    </div>
  )
}
