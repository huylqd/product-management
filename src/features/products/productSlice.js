import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { 
    products: [],
    status: 'idle',
    error: null,
}

export const fetchProducts = createAsyncThunk('/products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:5000/api/products')
    return response.data
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdded: ( state, action) => {
            state.products.push(action.payload)
        },
        productUpdated: (state, action) => {
            const { id, updates } = action.payload;
            const existingProduct = state.products.find((product) => product.id === id);
            if ( existingProduct ) {
                Object.assign(existingProduct, updates);
            }
        },
        productDeleted: (state, action) => {
            const id = action.payload;
            state.products = state.products.filter((product) => product.id !== id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
                }
            )
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message
            })
    }
})

export const { productAdded, productUpdated, productDeleted } = productSlice.actions
export default productSlice.reducer