"use server";
import { CreateCategoryParams } from "@/types";

export const createCategory = async({categoryName}: CreateCategoryParams) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({categoryName}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating category:', errorData);
      throw new Error(errorData.message || 'Failed to create category'); 
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getAllCategories = async () => {
  try {
    console.log('Fetching categories from:', `${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
