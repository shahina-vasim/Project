import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import apipath from '../apipath';

export default function CategoryList() {
  var [apidata, setApidata] = useState([]);

  useEffect(() => {
    fetch(apipath + 'category-list')
      .then(res => res.json())
      .then(result => {
        setApidata(result);
      })
  }, [])

  return (
    <div className='container'>

      <h1>CategoryList</h1>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Category-ID</th>
            <th scope="col">Category-Name</th>
            <th>Delete</th>
            <th>Edit</th>


          </tr>
        </thead>
        <tbody>
          {

            apidata && apidata.map(obj =>
              <tr>
                <td>{obj._id}</td>
                <td>{obj.name}</td>
                <td>
                  <Link to={'/delete-category/' + obj._id}>Delete</Link>
                </td>
                <td><Link to={'/edit-category/' + obj._id}> Edit</Link></td>


              </tr>

            )
          }

        </tbody>
      </table>

    </div>
  )
}
