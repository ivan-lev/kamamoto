import './AdminCategories.scss';

// React
import { useEffect, useState } from 'react';

// Utils
import { api } from '../../utils/api';

// Types
type Category = {
  category: string;
  title: string;
  thumbnail: string;
};

export default function AdminCategories(): JSX.Element {
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    api
      .getCategories()
      .then(response => setCategories(response))
      .catch(error => console.log(error));
  }, []);
  return (
    <>
      <div>Категории</div>
      <ul>
        {categories.map(category => (
          <li key={category.title}>
            {category.title} - {category.category} - {category.thumbnail}
          </li>
        ))}
      </ul>
    </>
  );
}
