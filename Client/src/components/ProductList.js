import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apipath from '../apipath';


export default function ProductList() {
  var [apidata, setApidata] = useState([]);
  var [count, setCount] = useState(0);
  var [page, setPage] = useState(0);
  var [pagearray, setPagearray] = useState([]);
  var [perpage, setPerpage] = useState(10);

  useEffect(() => {
    fetch(apipath + 'product-list')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        var { pro_ans, proCount } = result;

        console.log(proCount);
        setApidata(pro_ans);
        setCount(proCount);

        var totalPages = Math.ceil(proCount / perpage);

        setPage(totalPages);

        var arrPage = [];
        for (var i = 1; i <= totalPages; i++) {
          arrPage.push(i);
        }
        console.log(arrPage);
        setPagearray(arrPage);

      })
  }, [])

  function productShow(ev) {
    ev.preventDefault();
    console.log(ev.target.attributes.for.value);
    var pageno = ev.target.attributes.for.value;
    console.log(perpage);

    var skipvalue = perpage * pageno - perpage;
    console.log(skipvalue, pageno);
    console.log(`product-list/${skipvalue}/${perpage}`);
    fetch(`${apipath}product-list/${skipvalue}/${perpage}`)
      .then(res => res.json())
      .then(ans => {
        console.log("After Pagination");
        console.log(ans);
        var { pro_ans, proCount } = ans;
        setApidata(pro_ans);
      })
  }

  return (
    <div className='container'>
      <h1>ProductList</h1>
      <hr />
      {count},{page}
      <hr />
      {
        pagearray && pagearray.length > 0 && pagearray.map(val =>

          <span>
            <a href='#' for={val} onClick={productShow}>Page {val} </a> &nbsp;
          </span>
        )

      }
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Product-ID</th>
            <th scope="col">Product-Name</th>
            <th scope="col">Category-Name</th>
            <th scope="col">Category-ID</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            apidata && apidata.map((obj) =>
              <tr>
                <td>{obj._id}</td>
                <td>{obj.name}</td>
                <td>{obj.catvalues[0].name}</td>
                <td>{obj.catid}</td>
                <td>
                  <Link to={"/delete-product/" + obj._id}> Delete </Link>
                </td>
                <td>
                  <Link to={"/edit-product/" + obj._id}> Edit </Link>
                </td>

              </tr>


            )
          }
        </tbody>
      </table>

    </div>
  )
}
