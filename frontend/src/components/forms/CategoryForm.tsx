import { ICategory } from '@/types/definitions';
import styles from './CategoryForm.module.scss';
import { Form, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  description: string;
  image: string;
};

export default function CategoryForm({
  children,
  category,
  isDisable = false,
  method,
  action,
}: {
  children: React.ReactNode;
  category: ICategory | null;
  isDisable?: boolean;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH';
  action?: string;
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
          defaultValue={category?.name ?? ''}
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
          defaultValue={category?.description ?? ''}
          id='description'
          type='text'
          disabled={isDisable}
        />
        {errors && errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
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
          defaultValue={category?.image ?? ''}
          id='image'
          type='url'
          disabled={isDisable}
        />
        {errors && errors.image && (
          <p className={styles.error}>{errors.image.message}</p>
        )}
      </div>
      {children}
    </Form>
  );
}
