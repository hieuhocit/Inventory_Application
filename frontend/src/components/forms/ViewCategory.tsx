import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Modal from '../modal/Modal';
import CategoryForm from './CategoryForm';
import { getCategoryById } from '@/utils/apis';
import { ICategory } from '@/types/definitions';

export async function loader({ params }: LoaderFunctionArgs) {
  return getCategoryById(params.categoryId as string);
}

export default function ViewCategory() {
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
      <CategoryForm category={category} children={''} isDisable={true} />
    </Modal>
  );
}
