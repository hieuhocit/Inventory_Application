import { ICategory, IItem } from '@/types/definitions';
import styles from './ItemForm.module.scss';
import { Form, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: string;
  categoryId: string;
};

export default function CategoryForm({
  children,
  item,
  categories,
  isDisable = false,
  method,
  action,
}: {
  children: React.ReactNode;
  item: IItem | null;
  isDisable?: boolean;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH';
  action?: string;
  categories?: ICategory[] | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submit = useSubmit();

  function onSubmit(data: Inputs) {
    submit(data, { method: method, action: action });
  }

  return (
    <Form method={method} action={action} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <label htmlFor='name'>Name:</label>
        <input
          {...register('name', {
            validate: (value) =>
              value.trim() !== '' || 'This field cannot be only whitespace',
            required: 'This field is required',
          })}
          defaultValue={item?.name ?? ''}
          id='name'
          type='text'
          disabled={isDisable}
        />
        {errors && errors.name && (
          <p className={styles.error}>{errors.name.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='description'>Description:</label>
        <input
          {...register('description', {
            required: 'This field is required',
            validate: (value) =>
              value.trim() !== '' || 'This field cannot be only whitespace',
          })}
          defaultValue={item?.description ?? ''}
          id='description'
          type='text'
          disabled={isDisable}
        />
        {errors && errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='price'>Price:</label>
        <input
          {...register('price', {
            required: 'This field is required',
            validate: (value) => {
              if (value.trim() === '') {
                return 'This field cannot be only whitespace';
              }
              return !Number.isNaN(Number(value))
                ? true
                : 'The value must be a number';
            },
            min: {
              value: 0,
              message: 'The minimum must be equal to or greater than 0',
            },
          })}
          defaultValue={item?.price ?? ''}
          id='price'
          type='text'
          disabled={isDisable}
        />
        {errors && errors.price && (
          <p className={styles.error}>{errors.price.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='quantity'>Quantity:</label>
        <input
          {...register('quantity', {
            required: 'This field is required',
            min: {
              value: 0,
              message: 'The minimum must be equal to or greater than 0',
            },
            validate: (value) => {
              if (value.trim() === '') {
                return 'This field cannot be only whitespace';
              }
              return !Number.isNaN(Number(value)) &&
                Number.isInteger(Number(value))
                ? true
                : 'The value must be a number and integer';
            },
          })}
          defaultValue={item?.quantity ?? ''}
          id='quantity'
          type='number'
          disabled={isDisable}
        />
        {errors && errors.quantity && (
          <p className={styles.error}>{errors.quantity.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='image'>Image URL:</label>
        <input
          {...register('image', {
            required: 'This field is required',
            validate: (value) =>
              value.trim() !== '' || 'This field cannot be only whitespace',
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
              message: 'Invalid URL format',
            },
          })}
          defaultValue={item?.image ?? ''}
          id='image'
          type='url'
          disabled={isDisable}
        />
        {errors && errors.image && (
          <p className={styles.error}>{errors.image.message}</p>
        )}
      </div>
      <div className={styles.selectContainer}>
        <label htmlFor='categoryId'>Categories:</label>
        <select
          defaultValue={item?.category_id || (categories as ICategory[])[0].id}
          id='categoryId'
          {...register('categoryId', {
            required: 'This field is required',
          })}
          disabled={isDisable}
        >
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        {errors && errors.categoryId && (
          <p className={styles.error}>{errors.categoryId.message}</p>
        )}
      </div>
      {children}
    </Form>
  );
}
