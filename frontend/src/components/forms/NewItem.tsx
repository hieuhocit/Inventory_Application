import {
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Modal from '../modal/Modal';
import ItemForm from './ItemForm';
import styles from './NewCategoryForm.module.scss';
import { createItem } from '@/utils/apis';
import { ICategory, IItem } from '@/types/definitions';

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();

  const data: IItem = {
    name: formData.get('name') as string,
    categoryId: formData.get('categoryId') as string,
    description: formData.get('description') as string,
    image: formData.get('image') as string,
    price: Number(formData.get('price')),
    quantity: Number(formData.get('quantity')),
  };

  const resData = await createItem(data);

  if (!resData) {
    alert('Could not create item, please try again later.');
    return null;
  } else {
    return redirect('/item-management');
  }
}

export default function NewItem() {
  const navigate = useNavigate();

  const categories: ICategory[] | null = useLoaderData() as ICategory[] | null;

  function handleClose(modal: HTMLDialogElement | null) {
    if (modal) {
      modal.close();
    }
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <ItemForm method='POST' item={null} categories={categories}>
        <div className={styles.formAction}>
          <button onClick={() => handleClose(null)} type='button'>
            Cancel
          </button>
          <button type='submit'>Save</button>
        </div>
      </ItemForm>
    </Modal>
  );
}
