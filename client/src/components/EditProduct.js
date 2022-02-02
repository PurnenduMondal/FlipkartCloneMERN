import React, { useEffect, useState } from 'react'
import './EditProduct.css'
import { useParams } from 'react-router-dom'
import { getAllProducts, updateProduct } from '../functions/product'
import AdminSidebar from './AdminSidebar'


function EditProduct() {
  const params = useParams()
  const initialProductStates = { _id: "", name: "", category: "", subcategory: "", selling_price: "", actual_price: "", discount: "", images: [{ url: "" }], slug: "" }
  const [product, setProduct] = useState(initialProductStates)

  useEffect(() => {

    getAllProducts({ slug: params.slug }).then(res => setProduct(res.data[0]))
  }, [])

  useEffect(() => {
    let discount = parseInt((product.actual_price - product.selling_price)*(100/product.actual_price))
    setProduct({ ...product, discount:discount })
  }, [product.selling_price, product.actual_price])

  const handleInputChange = (e) => {
    
    let discount = Math.round((product.actual_price - product.selling_price)*(100/product.actual_price))
    setProduct({ ...product, [e.target.name]: e.target.value })    

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProduct(product).then((res) => setProduct(res.data))
  }

  return (
    <div className="editProduct">
      <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
        <AdminSidebar panelName={'Products'} />
        <div className="verticalLine" style={{ borderLeft: '1px solid #b1b1b1' }}></div>

        <form className="editProduct__form" onSubmit={handleSubmit}>
          <h4>Edit Product</h4>
          <div style={{ width: '100%' }}>
            <label >Product Name</label>
            <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleInputChange} className="form-control shadow-none my-2" required />
          </div>

          <div className='categoryDiv'>
            <div>
              <label htmlFor="category">Category</label>
              <input type="text" name="category" placeholder="category" value={product.category} onChange={handleInputChange} className="form-control shadow-none my-2" required />
            </div>

            <div>
              <label htmlFor="subcategory">SubCategory</label>
              <input type="text" name="subcategory" placeholder="subCategory" value={product.subcategory} onChange={handleInputChange} className="form-control shadow-none my-2" required />
            </div>

          </div>
          <div className='price_row categoryDiv d-flex'>
            <div style={{ marginRight: '10px', marginTop: '10px' }}>
              <label htmlFor="selling_price">Selling Price</label>
              <input type="number" name="selling_price" placeholder="price" value={product.selling_price} onChange={handleInputChange} className="form-control shadow-none" required />
            </div>
            <div style={{ marginRight: '10px', marginTop: '10px' }}>
              <label htmlFor="actual_price">Actual Price</label>
              <input type="number" name="actual_price" placeholder="price" value={product.actual_price} onChange={handleInputChange} className="form-control shadow-none" required />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label htmlFor="discount">Discount</label>
              <input type="number" name="discount" placeholder="discount" value={product.discount} className="form-control shadow-none" />
            </div>
          </div>
          <div style={{ marginTop: '20px', width: '100%' }}>
            <label >Product Images</label>
            <div className="editProduct__images">

              {product.images.map((image, i) => (
                <div key={i} className="img-thumbnail d-flex justify-content-center align-items-center m-1" style={{ width: "100px", height: "100px" }}>
                  <img src={image.url} alt="" style={{ maxHeight: '100%', maxWidth: '100%', margin: "auto" }} />
                </div>
              ))}
            </div>
            Add Images: <input type="file" style={{ marginTop: "10px" }} />
          </div>

          <button type="submit" name="createNewCourseBtn" className="addbtn btn btn-primary my-3">Update Product</button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
