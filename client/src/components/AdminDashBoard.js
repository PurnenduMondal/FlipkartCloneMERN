import React, { lazy, useEffect, useState } from 'react'
import './AdminDashboard.css'
import { useSelector } from "react-redux"
import axios from 'axios'
import { auth } from '../firebase'
import { createProduct, getAllProducts } from '../functions/product'
import { Link } from 'react-router-dom'
const AdminSidebar = lazy(() => import("./AdminSidebar.js"))


export default function AdminDashboard() {

    const initialProductStates = { name: "", category: "", subcategory: "", selling_price: "", actual_price: "", discount: "", images: [] }
    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(initialProductStates)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() =>{
        getAllProducts({}).then(res => setProducts(res.data))
    },[])
    
    
    const handleInputChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})

        if (e.target.files && e.target.files[0]) {

            var productImages = []
            let files = e.target.files
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    productImages.push(e.target.result);
                    setProduct({ ...product, images: productImages })
                };
                reader.readAsDataURL(files[i]);

            }

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        let idToken = await auth.currentUser.getIdToken();
        axios.post(
            process.env.REACT_APP_API + "/uploadimages",
            { images: product.images },
            {
                headers: {
                    authtoken: idToken,
                },
            }
        )
        .then((res) => {
            createProduct({ ...product, images: res.data }, idToken)
            setProduct(initialProductStates)
            getAllProducts({}).then(res => setProducts(res.data))
            setIsLoading(false)
        })
        .catch(err => console.log(err))

    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AdminSidebar panelName={'Products'}/>
            <div className="verticalLine" style={{ borderLeft: '1px solid #b1b1b1' }}></div>
            <div className="py-3" style={{ width: '100%', paddingLeft: '1rem' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-center" scope="col">Name</th>
                            <th className="text-center" scope="col">selling price</th>
                            <th className="text-center" scope="col">actual price</th>
                            <th className="text-center" scope="col">dicount</th>
                            <th className="text-center" scope="col">Edit</th>
                            <th className="text-center" scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, i) =>
                            <tr key={i}>
                                <td className="text-center">{product.name}</td>
                                <td className="text-center">{product.selling_price}</td>
                                <td className="text-center">{product.actual_price}</td>
                                <td className="text-center">{product.discount}%</td>
                                <td className="text-center">
                                    <form method="post">
                                        <Link to={"/admin/editproduct/"+product.slug} style={{ height: '23px' }} name="profileBtn" href="" type="submit" className="btn btn-sm">
                                            <span className="material-icons">
                                                edit
                                            </span>
                                        </Link>
                                    </form>
                                </td>
                                <td className="text-center">
                                    <a name="deleteItem" className="btn btn-sm">
                                        <span className="material-icons">
                                            delete
                                        </span>
                                    </a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <form onSubmit={handleSubmit} className="m-3 d-flex flex-column align-items-center" >

                <div className="text-center" style={{ border: '1px solid #c8c8c8', padding: '15px', backgroundColor: '#e0e0e0', borderRadius: '10px' }}>
                    <h4>Add Product</h4>
                    <input value={product.name} onChange={handleInputChange} type="text" name="name" placeholder="Product Name" className="form-control shadow-none my-2" required/>
                    <input value={product.category} onChange={handleInputChange} type="text" name="category" placeholder="category" className="form-control shadow-none my-2" required/>
                    <input value={product.subcategory} onChange={handleInputChange} type="text" name="subcategory" placeholder="subCategory" className="form-control shadow-none my-2" required/>
                    <input value={product.selling_price} onChange={handleInputChange} type="number" name="selling_price" placeholder="Selling price" className="form-control shadow-none my-2" required/>
                    <input value={product.actual_price} onChange={handleInputChange} type="number" name="actual_price" placeholder="Actual price" className="form-control shadow-none my-2" required/>
                    <input value={product.discount} onChange={handleInputChange} type="number" name="discount" placeholder="discount" className="form-control shadow-none my-2" required/>
                    <input type="file" onChange={handleInputChange} accept="image/*" name="images[]" className="product-images form-control shadow-none my-2" placeholder="image" multiple />
                    <div className="preview_img d-flex flex-wrap justify-content-center" style={{ padding: '10px 0', width: '230px' }}>
                        {product.images.map((image) => (
                            <div className="img-thumbnail d-flex justify-content-center align-items-center m-1" style={{ width: "100px", height: "100px" }}>
                                <img src={image} alt="" style={{ maxHeight: '100%', maxWidth: '100%', margin: "auto" }} />
                            </div>
                        ))}
                    </div>
                    <button type="submit" name="createNewCourseBtn" className="addbtn btn btn-primary" disabled={isLoading}>
                        {isLoading ?
                            <div className="spinner-container">
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div> : 
                            "Submit"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}
