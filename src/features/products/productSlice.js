import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import { toast } from "react-toastify";

const initialState = { 
    products: [],
    status: 'idle',
    error: null,
}

export const fetchProducts = createAsyncThunk('/products/fetchProducts', async () => {
    const response = await API.get('http://localhost:5000/api/products')
    return response.data
})

export const addProduct = createAsyncThunk('/products/addProduct',async (productData) => {
    const response = await API.post('http://localhost:5000/api/products',productData)
    console.log(response);
    
    return response.data
})

export const updateProduct = createAsyncThunk('/products/updateProduct', async ({id, ...updateData }) => {
    const response = await API.put(`http://localhost:5000/api/products/${id}`, updateData)
    return response.data
})

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async(id) => {
    const response = await API.delete(`http://localhost:5000/api/products/${id}`)
    console.log('response', response);
    
    return response.data
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.products = action.payload;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.products.push(action.payload);
          toast.success('Add product successfully');
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.status = "failed"
            toast.error("Add failed: server error")
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          const index = state.products.findIndex((product) => product._id === action.payload._id);
          if (index !== -1) {
            state.products[index] = action.payload.data;
          }
          toast.success('Updated product successfully');
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.status = "failed"
            toast.error("Updated failed: server error")
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.products = state.products.filter((product) => product._id !== action.payload._id);
          toast.success('Deleted product successfully');
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.status = "failed"
            toast.error("Deleted failed: server error")
        })
    },
  });
  

// export const { productAdded, productUpdated, productDeleted } = productSlice.actions
export default productSlice.reducer