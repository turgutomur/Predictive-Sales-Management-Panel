import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_BASE = 'http://localhost:8091/api/products';

const ProductForm = ({ product, onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
    } else {
      setName('');
      setCategory('');
      setPrice('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, category, price: parseFloat(price) };

    try {
      if (product) {
        await axios.put(`http://localhost:8091/api/products/${product.id}`, newProduct);
      } else {
        await axios.post('http://localhost:8091/api/products', newProduct);
      }
      onSubmit();
      setName('');
      setCategory('');
      setPrice('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
      <input 
        type="text" 
        placeholder="İsim" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Kategori" 
        value={category} 
        onChange={e => setCategory(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Fiyat" 
        value={price} 
        onChange={e => setPrice(e.target.value)} 
        required 
        step="0.01"
      />
      <button type="submit">{product ? 'Güncelle' : 'Ekle'}</button>
    </form>
  );
};

export default ProductForm;
