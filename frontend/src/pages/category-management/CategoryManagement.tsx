import { useSelector } from 'react-redux';
import {
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';

import styles from './CategoryManagement.module.scss';

import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { themeMode } from '@/store/theme/themeSelector';
import { deleteCategory, getCategories } from '@/utils/apis';
import { ICategory } from '@/types/definitions';

export async function loader() {
  return getCategories();
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const categoryId = formData.get('categoryId');

  const resData = await deleteCategory(categoryId as string);

  if (!resData) {
    alert('Could not delete category, please try again later.');
    return null;
  } else {
    return redirect('/category-management');
  }
}

export default function CategoryManagementPage() {
  const mode = useSelector(themeMode);

  const submit = useSubmit();

  const isDark = mode === 'dark';

  const categories: ICategory[] | null = useLoaderData() as ICategory[] | null;

  const navigate = useNavigate();

  function handleDeleteCategory(categoryId: string) {
    const ok = confirm('Are you sure you want to delete this?');
    if (!ok) return;
    submit({ categoryId }, { method: 'DELETE', replace: true });
  }

  return (
    <>
      <div className={`${styles.management} ${isDark ? styles.dark : ''}`}>
        <div className={styles.head}>
          <h1 className={styles.title}>Category Management</h1>
          <button onClick={() => navigate('/category-management/new')}>
            Create new category
          </button>
        </div>

        {!categories && <p>There are no categories...</p>}
        {categories && (
          <div className={styles.body}>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className={styles.borderRadiusLeft}>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <div className={styles.imageContainer}>
                        <img src={category?.image ?? ''} alt={category.name} />
                      </div>
                    </td>
                    <td className={styles.borderRadiusRight}>
                      <div className={styles.action}>
                        <div
                          onClick={() =>
                            navigate(`/category-management/${category.id}`, {
                              replace: true,
                            })
                          }
                          className={styles.icon}
                        >
                          <FaEye />
                        </div>
                        <div
                          onClick={() =>
                            navigate(
                              `/category-management/${category.id}/edit`,
                              { replace: true }
                            )
                          }
                          className={styles.icon}
                        >
                          <FaEdit />
                        </div>
                        <div
                          onClick={() =>
                            handleDeleteCategory(category.id as string)
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
