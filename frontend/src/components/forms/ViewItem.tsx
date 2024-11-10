import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Modal from '../modal/Modal';
import ItemForm from './ItemForm';
import { getCategories, getItemById } from '@/utils/apis';
import { ICategory, IItem } from '@/types/definitions';

export async function loader({ params }: LoaderFunctionArgs) {
  const [item, categories]: [IItem | null, ICategory[] | null] =
    await Promise.all([getItemById(params.itemId as string), getCategories()]);
  return { item, categories };
}

export default function ViewItem() {
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
      <ItemForm
        item={item}
        categories={categories}
        children={''}
        isDisable={true}
      />
    </Modal>
  );
}
