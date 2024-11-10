import {
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Modal from '../modal/Modal';
import CategoryForm from './CategoryForm';
import styles from './NewCategoryForm.module.scss';
import { ICategory } from '@/types/definitions';
import { updateCategory } from '@/utils/apis';

export async function action({ params, request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const { categoryId } = params;

  const data: {
    name: string;
    description: string;
    image: string;
  } = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    image: formData.get('image') as string,
  };

  const resData = await updateCategory(categoryId as string, data);

  if (!resData) {
    alert('Could not update category, please try again later.');
    return null;
  } else {
    return redirect('/category-management');
  }
}

export default function EditCategory() {
  const navigate = useNavigate();

  const category: ICategory | null = useLoaderData() as ICategory | null;

  function handleClose(modal: HTMLDialogElement | null) {
    if (modal) {
      modal.close();
    }
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <CategoryForm method='PATCH' category={category}>
        <div className={styles.formAction}>
          <button onClick={() => handleClose(null)} type='button'>
            Cancel
          </button>
          <button type='submit'>Update</button>
        </div>
      </CategoryForm>
    </Modal>
  );
}
