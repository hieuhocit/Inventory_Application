import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
} from 'react-router-dom';

import CategoryPage, {
  loader as CategoriesLoader,
} from '@/pages/category/Category';
// import ItemsPage2, { loader as ItemsLoader1 } from '@/pages/item/Items';
import ItemDetailsPage, {
  loader as ItemDetailsLoader,
} from '@/pages/item/ItemDetails';
import RootLayout from '@/RootLayout';

import CategoryManagementPage, {
  loader as CategoryManagementLoader,
  action as deleteCategoryAction,
} from '@/pages/category-management/CategoryManagement';
import NewCategory, {
  action as newCategoryAction,
} from '@/components/forms/NewCategory';
import EditCategory, {
  action as editCategoryAction,
} from '@/components/forms/EditCategory';
import ViewCategory, {
  loader as getCategoryLoader,
} from '@/components/forms/ViewCategory';

import ItemManagementPage, {
  loader as itemManagementLoader,
  action as itemManagementAction,
} from '@/pages/item-management/ItemManagement';
import NewItem, { action as newItemAction } from '@/components/forms/NewItem';
import ViewItem, {
  loader as viewItemLoader,
} from '@/components/forms/ViewItem';
import EditItem, {
  action as editItemAction,
} from '@/components/forms/EditItem';
import { lazy, Suspense } from 'react';

const ItemsPage = lazy(() => import('@/pages/item/Items'));
const ItemsLoader = async (args: any) => {
  const module = await import('@/pages/item/Items');
  return module.loader(args);
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/categories'} replace />,
  },
  {
    path: '/categories',
    element: <RootLayout children={<Outlet />} />,
    children: [
      {
        path: '/categories',
        element: <CategoryPage />,
        loader: CategoriesLoader,
      },
      {
        path: '/categories/:categoryId/items',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ItemsPage />
          </Suspense>
        ),
        loader: ItemsLoader,
      },
      {
        path: '/categories/:categoryId',
        loader: ({ params }) =>
          redirect(`/categories/${params.categoryId}/items`),
      },
      {
        path: '/categories/:categoryId/items/:itemId',
        element: <ItemDetailsPage />,
        loader: ItemDetailsLoader,
      },
    ],
  },
  {
    element: <RootLayout children={<Outlet />} />,
    // loader: () => {
    //   const PIN = prompt(
    //     'You need a password to have permission to process this page'
    //   );
    //   if (PIN === import.meta.env.VITE_PIN) return null;
    //   return redirect('/categories');
    // },
    children: [
      {
        path: '/item-management',
        element: <ItemManagementPage />,
        action: itemManagementAction,
        loader: itemManagementLoader,
        children: [
          {
            path: '/item-management/new',
            element: <NewItem />,
            action: newItemAction,
            loader: CategoryManagementLoader,
          },
          {
            path: '/item-management/:itemId/edit',
            element: <EditItem />,
            loader: viewItemLoader,
            action: editItemAction,
          },
          {
            path: '/item-management/:itemId',
            element: <ViewItem />,
            loader: viewItemLoader,
          },
        ],
      },
      {
        path: '/category-management',
        element: <CategoryManagementPage />,
        loader: CategoryManagementLoader,
        action: deleteCategoryAction,
        children: [
          {
            path: '/category-management/new',
            element: <NewCategory />,
            action: newCategoryAction,
          },
          {
            path: '/category-management/:categoryId/edit',
            element: <EditCategory />,
            loader: getCategoryLoader,
            action: editCategoryAction,
          },
          {
            path: '/category-management/:categoryId',
            element: <ViewCategory />,
            loader: getCategoryLoader,
          },
        ],
      },
    ],
  },
]);

export default router;
