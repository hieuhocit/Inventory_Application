import { LoaderFunctionArgs, redirect, useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import CategoryForm from './CategoryForm';
import styles from './NewCategoryForm.module.scss';
import { createCategory } from '@/utils/apis';
import { ICategory } from '@/types/definitions';

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();

  const data: ICategory = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    image: formData.get('image') as string,
  };

  const resData = await createCategory(data);

  if (!resData) {
    alert('Could not create category, please try again later.');
    return null;
  } else {
    return redirect('/category-management');
  }
}

export default function NewCategory() {
  const navigate = useNavigate();

  function handleClose(modal: HTMLDialogElement | null) {
    if (modal) {
      modal.close();
    }
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <CategoryForm method='POST' category={null}>
        <div className={styles.formAction}>
          <button onClick={() => handleClose(null)} type='button'>
            Cancel
          </button>
          <button type='submit'>Save</button>
        </div>
      </CategoryForm>
    </Modal>
  );
}
