import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import styles from './Items.module.scss';
import { getCategoryById, getItemsByCategoryId } from '@/utils/apis';
import { ICategory, IItem } from '@/types/definitions';

export async function loader({ params }: LoaderFunctionArgs) {
  const { categoryId } = params;
  const [category, items] = await Promise.all([
    getCategoryById(categoryId as string),
    getItemsByCategoryId(categoryId as string),
  ]);
  return { category, items };
}

export default function ItemsPage() {
  const data: {
    category: ICategory;
    items: IItem[];
  } | null = useLoaderData() as {
    category: ICategory;
    items: IItem[];
  } | null;
  return (
    <>
      {!data && <p>Something went wrong, try again later.</p>}
      {data && (
        <div className={styles.category}>
          <div className={styles.about}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={data.category.image ?? ''}
                alt={data.category.name}
              />
            </div>

            <div className={styles.title}>
              <h1 className={styles.name}>{data.category.name}</h1>
            </div>
            <p className={styles.description}>{data.category.description}</p>
          </div>

          <div>
            <h2 className={styles.subTitle}>Items</h2>
            <div className={styles.gridContainer}>
              {data.items.map((item) => (
                <Link
                  key={item.id}
                  to={`/categories/${data.category.id}/items/${item.id}`}
                  className={styles.item}
                >
                  <div className={styles.imageContainer}>
                    <img
                      className={styles.image}
                      src={item.image ?? ''}
                      alt={item.name}
                    />
                  </div>
                  <h2 className={styles.name}>{item.name}</h2>
                  <p className={styles.description}>{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
