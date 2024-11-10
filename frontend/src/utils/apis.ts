import { ICategory, IItem } from '@/types/definitions';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getCategories() {
  try {
    const res = await fetch(BASE_URL + '/categories');
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategoryById(categoryId: string) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`);
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createCategory(data: ICategory) {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateCategory(categoryId: string, data: ICategory) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: 'DELETE',
    });
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getItemsByCategoryId(categoryId: string) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}/items`);
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getItemById(itemId: string) {
  try {
    const res = await fetch(`${BASE_URL}/items/${itemId}`);
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getItems() {
  try {
    const res = await fetch(BASE_URL + '/items');
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getItemsByName(name: string) {
  try {
    const res = await fetch(`${BASE_URL}/items?search=${name}`);
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createItem(data: IItem) {
  try {
    const res = await fetch(`${BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateItem(itemId: string, data: IItem) {
  try {
    const res = await fetch(`${BASE_URL}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteItem(itemId: string) {
  try {
    const res = await fetch(`${BASE_URL}/items/${itemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) return null;
    const dataRes = await res.json();
    return dataRes.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
