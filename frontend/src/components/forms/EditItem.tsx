import {
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Modal from '../modal/Modal';
import ItemForm from './ItemForm';
import styles from './NewItemForm.module.scss';
import { ICategory, IItem } from '@/types/definitions';
import { updateItem } from '@/utils/apis';

export async function action({ params, request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const { itemId } = params;

  const data: IItem = {
    name: formData.get('name') as string,
    categoryId: formData.get('categoryId') as string,
    description: formData.get('description') as string,
    image: formData.get('image') as string,
    price: Number(formData.get('price')),
    quantity: Number(formData.get('quantity')),
  };

  const resData = await updateItem(itemId as string, data);

  if (!resData) {
    alert('Could not update item, please try again later.');
    return null;
  } else {
    return redirect('/item-management');
  }
}

export default function EditItem() {
  const navigate = useNavigate();

  const {
    item,
    categories,
  }: {
    item: IItem | null;
    categories: ICategory[] | null;
  } = useLoaderData() as {
    item: IItem | null;
    categories: ICategory[] | null;
  };

  function handleClose(modal: HTMLDialogElement | null) {
    if (modal) {
      modal.close();
    }
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <ItemForm method='PATCH' item={item} categories={categories}>
        <div className={styles.formAction}>
          <button onClick={() => handleClose(null)} type='button'>
            Cancel
          </button>
          <button type='submit'>Update</button>
        </div>
      </ItemForm>
    </Modal>
  );
}
