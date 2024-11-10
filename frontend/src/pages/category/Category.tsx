import { Link, useLoaderData, Await, defer } from 'react-router-dom';
// import { Link, useLoaderData } from 'react-router-dom';
import styles from './Category.module.scss';
import { getCategories } from '@/utils/apis';
import { ICategory } from '@/types/definitions';
import { Suspense } from 'react';

export async function loader() {
  return defer({
    data: getCategories(),
  });
}

// export async function loader() {
//   return getCategories();
// }

export default function CategoryPage() {
  const { data } = useLoaderData() as { data: Promise<ICategory[] | null> };
  // const data = useLoaderData() as ICategory[] | null;

  return (
    <>
      <div className={styles.category}>
        <div className={styles.title}>
          <h1>Categories</h1>
        </div>
        <Suspense
          fallback={
            <p style={{ textAlign: 'center' }}>
              <i>Loading categories...</i>
            </p>
          }
        >
          <Await resolve={data}>
            {(loadedData) => (
              <div className={styles.gridContainer}>
                {!loadedData && <p>No categories...</p>}
                {loadedData &&
                  loadedData.map((category: ICategory) => (
                    <Link
                      key={category.id}
                      to={`/categories/${category.id}/items`}
                      className={styles.item}
                    >
                      <div className={styles.imageContainer}>
                        <img
                          className={styles.image}
                          src={category.image ? category.image : ''}
                          alt={category.name}
                        />
                      </div>
                      <h2 className={styles.name}>{category.name}</h2>
                      <p className={styles.description}>
                        {category.description}
                      </p>
                    </Link>
                  ))}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
