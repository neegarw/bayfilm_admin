import toast from "react-hot-toast";
import { axiosInstance, axiosInstanceMultiPart } from "../config/axiosInstance"

// Butun kategorileri getirmek ucun funksiya
export async function getFullCategory() {
    try {
        const response = await axiosInstance.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Categoriyalarin gelmeyinde problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

export async function getFullCSubcategory() {
    try {
        const response = await axiosInstance.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Categoriyalarin gelmeyinde problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

//  id'ye göre kategoriyi getirmek ucun funk
export async function getCategoryById(id) {
    try {
        const response = await axiosInstance.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Kategori gələndə problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// Yeni bir kategori yarat ucun funk
export async function createCategory(categoryData) {
    try {
        const response = await axiosInstance.post('/categories', categoryData);
        return response.data;
    } catch (error) {
        console.error('Kategoriyaya yaradilan vaxt problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// id'ye göre kategoriyani deyismek ucun funk
export async function editCategoryById(id, categoryData) {
    try {
        const response = await axiosInstance.put(`/categories/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Kategoriyaya duzelis olan da problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

//  id'ye göre kategoriyani silmek ucun funk
export async function deleteCategoryById(id) {
    try {
        const response = await axiosInstance.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Kategori silinen vaxt problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// subcategory ucun funk
export async function createSubcategory(subcategoryData) {
    try {
        const response = await axiosInstance.post('/categories/subcategory', subcategoryData);
        return response.data;
    } catch (error) {
        let deyis = await error.response?.data.error.includes("Unique constraint failed on the fields")
        await toast.error("Bu adda subkateqoriya artıq mövcuddur")
        throw error
    }
}

export async function updateSubcategory(id, subcategoryData) {
    try {
        const response = await axiosInstance.put(`/categories/subcategory/${id}`, subcategoryData);
        return response.data;
    } catch (error) {
        console.error('Subkategoriyaya duzelis olan da problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

export async function deleteSubcategory(id) {
    try {
        const response = await axiosInstance.delete(`/categories/subcategory/${id}`);
        return response.data;
    } catch (error) {
        console.error('Subkategori silinen vaxt problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// Yeni mehsul yaratmaq ucun funk
export async function createProduct(productData) {
    try {
        const response = await axiosInstance.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error('Mehsul yaradilan zaman problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// Butun mehsullari getirmek ucun funk
export async function getProducts() {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        console.error('Məhsullar gələndə problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// id'ye göre mehsul getirmek ucun funk
export async function getProductById(id) {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Məhsul gələndə problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// id'ye göre mehsulu deyismek ucun funk
export async function editProduct(id, productData) {

    try {
        const response = await axiosInstance.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Məhsula deyisiklik zamani problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// axtaris ucun funk
export async function searchProduct(query) {
    try {
        const response = await axiosInstance.get(`/products/search?name=${query}`);
        return response.data;
    } catch (error) {
        console.error('Məhsul axtaran vaxt problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

// id'ye göre mehsul sikmek ucun funk
export async function deleteProductById(id) {
    try {
        const response = await axiosInstance.delete(`/products/${Number(id)}`);
        return response.data;
    } catch (error) {
        console.error('Məhsul silinen vaxt problem oldu:', error.response?.data || error.message);
        throw error;
    }
}

export async function createImg(image) {
    const formData = new FormData();
    formData.append('img', image);
    const response = await axiosInstanceMultiPart.post('/img', formData);
    return response.data;
}

// Sekil silmek ucun funk
export const deleteImage = async (filename) => {
    const response = await axiosInstance.delete(`/img/${filename}`);
    return response.data;
};

export default {
    getFullCategory,
    createProduct,
    getCategoryById,
    editCategoryById,
    deleteCategoryById,
    createSubcategory,
    createCategory,
    getProducts,
    getProductById,
    editProduct,
    searchProduct,
    deleteProductById,
    updateSubcategory,
    deleteSubcategory,
    deleteImage,
    createImg,
    getFullCSubcategory
};
