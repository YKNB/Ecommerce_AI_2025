const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'Classic T-Shirt', price: 19.99, image: 'https://picsum.photos/seed/ts1/400/300', description: 'Comfortable cotton t-shirt' },
  { id: 2, name: 'Sneakers', price: 69.95, image: 'https://picsum.photos/seed/sn1/400/300', description: 'Stylish everyday sneakers' },
  { id: 3, name: 'Denim Jacket', price: 89.5, image: 'https://picsum.photos/seed/dj1/400/300', description: 'Warm denim jacket' },
  { id: 4, name: 'Beanie', price: 12.0, image: 'https://picsum.photos/seed/bn1/400/300', description: 'Cozy beanie hat' }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/product/:id', (req, res) => {
  const id = Number(req.params.id);
  const p = products.find(x => x.id === id);
  if (p) res.json(p); else res.status(404).json({ error: 'Not found' });
});

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Mock API listening on http://localhost:${port}`));
