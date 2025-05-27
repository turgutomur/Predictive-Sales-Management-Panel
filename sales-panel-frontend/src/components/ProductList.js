import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
const API_BASE = 'http://localhost:8091/api/products';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8091/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8091/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleFormSubmit = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div>
      <h2>Ürün Listesi</h2>
      <ProductForm product={editingProduct} onSubmit={handleFormSubmit} />
      <table border="1" cellPadding="10" style={{marginTop: '20px', width: '100%'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim</th>
            <th>Kategori</th>
            <th>Fiyat</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Düzenle</button>
                <button onClick={() => handleDelete(p.id)} style={{marginLeft:'10px'}}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
