import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import styles from './ItemDetails.module.scss';
import { getItemById } from '@/utils/apis';
import { IItem } from '@/types/definitions';

export async function loader({ params }: LoaderFunctionArgs) {
  return getItemById(params.itemId as string);
}

export default function ItemDetailsPage() {
  const data: IItem | null = useLoaderData() as IItem | null;

  return (
    <>
      {!data && <p>Some thing went wrong, try again later.</p>}
      {data && (
        <div className={styles.category}>
          <div className={styles.about}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={data.image ?? ''}
                alt={data.name}
              />
            </div>

            <div className={styles.title}>
              <h1 className={styles.name}>{data.name}</h1>
            </div>

            <div className={styles.purchase}>
              <p>
                Price: <span className={styles.price}>${data.price}</span>
              </p>
              <p>
                Quantity:{' '}
                <span className={styles.quantity}>{data.quantity}</span>
              </p>
            </div>

            <p className={styles.description}>{data.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
