import defaultProducts from "./products";
import { useState } from 'react';
import ProductList from "./ProductList";
import ProductSearchInput from "./ProductSearchInput";

export default function App() {
  const [products, setProducts] = useState(defaultProducts);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [...new Set(products.map(product => product.category))];

  function handleChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleInput(e) {
    setQuery(e.target.value);
  }

  function filterProducts(query, products, selectedCategory) {
    let filteredProducts = products;

    /* Filter by Query */
    filteredProducts = filteredProducts.filter((product) => {
      /* Challenge: Match product description */
      const name = product.name.toLowerCase();
      return name.match(query.toLowerCase());
    });

    /* Filter by Category */
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter((product) => {
        return product.category === selectedCategory;
      });
    }

    /* Challenge: Filter by Price Range */
    /* Challenge: Filter by Rating */

    return filteredProducts;
  }

  const filteredProducts = filterProducts(query, products, selectedCategory);

  return <div>
    <ProductSearchInput query={query} handleInput={handleInput} />
    <CategorySelect
      categories={categories}
      selectedCategory={selectedCategory}
      handleChange={handleChange}
    />
    <ProductList products={filteredProducts} />
  </div>;
}

function CategorySelect(props) {
  const { categories, selectedCategory, handleChange } = props;

  return (<div>
    <select
      name={"category"}
      value={selectedCategory}
      onChange={handleChange}
    >
      <option value={"all"}>All Categories</option>
      {categories.map(category => {
        return (<option value={category} key={category}>
          {category}
        </option>);
      })}
    </select>
  </div>);
}
