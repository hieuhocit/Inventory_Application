import { useSelector } from 'react-redux';
import {
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';

import styles from './ItemManagement.module.scss';

import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { themeMode } from '@/store/theme/themeSelector';
import { deleteItem, getItems } from '@/utils/apis';
import { IItem } from '@/types/definitions';

export async function loader() {
  return getItems();
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const itemId = formData.get('itemId');

  const resData = await deleteItem(itemId as string);

  if (!resData) {
    alert('Could not delete item, please try again later.');
    return null;
  } else {
    return redirect('/item-management');
  }
}

export default function ItemManagementPage() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const mode = useSelector(themeMode);

  const isDark = mode === 'dark';
  const items: IItem[] | null = useLoaderData() as IItem[] | null;

  function handleDeleteCategory(itemId: string) {
    const ok = confirm('Are you sure you want to delete this?');
    if (!ok) return;
    submit({ itemId }, { method: 'DELETE', replace: true });
  }

  return (
    <>
      <div className={`${styles.management} ${isDark ? styles.dark : ''}`}>
        <div className={styles.head}>
          <h1 className={styles.title}>Item Management</h1>
          <button onClick={() => navigate('/item-management/new')}>
            Create new item
          </button>
        </div>

        {!items && <p>There are no items...</p>}
        {items && (
          <div className={styles.body}>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.borderRadiusLeft}>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className={styles.imageContainer}>
                        <img src={item?.image ?? ''} alt={item.name} />
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td className={styles.borderRadiusRight}>
                      <div className={styles.action}>
                        <div
                          onClick={() =>
                            navigate(`/item-management/${item.id}`, {
                              replace: true,
                            })
                          }
                          className={styles.icon}
                        >
                          <FaEye />
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/item-management/${item.id}/edit`, {
                              replace: true,
                            })
                          }
                          className={styles.icon}
                        >
                          <FaEdit />
                        </div>
                        <div
                          onClick={() =>
                            handleDeleteCategory(item.id as string)
                          }
                          className={styles.icon}
                        >
                          <FaTrash />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
}
