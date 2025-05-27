import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8091/api/products';

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price
      });
    } else {
      setFormData({
        name: '',
        category: '',
        price: ''
      });
    }
  }, [product]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (product) {
        await axios.put(`${API_BASE}/${product.id}`, formData);
      } else {
        await axios.post(API_BASE, formData);
      }
      onSubmit(); // Listeyi yenile
    } catch (err) {
      console.error("Form gönderme hatası:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h3>{product ? 'Ürünü Güncelle' : 'Yeni Ürün Ekle'}</h3>
      <input
        type="text"
        name="name"
        placeholder="İsim"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Kategori"
        value={formData.category}
        onChange={handleChange}
        required
        style={{ marginLeft: '10px' }}
      />
      <input
        type="number"
        name="price"
        placeholder="Fiyat"
        value={formData.price}
        onChange={handleChange}
        required
        style={{ marginLeft: '10px' }}
      />
      <button type="submit" style={{ marginLeft: '10px' }}>
        {product ? 'Güncelle' : 'Ekle'}
      </button>
    </form>
  );
};

export default ProductForm;
