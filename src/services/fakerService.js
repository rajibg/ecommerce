import { fetcher } from './fetchService'


export const allProducts = async () => {
    try {
        const response = await fetcher.get('/products');
        return response.data;
    } catch (ex) {
        console.log(ex)
        return false;
    }
}

export const allCartProdcts = async (userid) => {
    try {
        const response = await fetcher.get(userid ? `carts/user/${userid}` : '/carts');
        return response.data;
    } catch (ex) {
        console.log(ex)
        return false;
    }
}


export const addProductInCart = async (product) => {
    // const allProducts = await allCartProdcts(5);
    const allProducts = [
        {
            productId: 2, quantity: 1
        },
        {
            productId: 3, quantity: 1
        },
        {
            productId: 4, quantity: 1
        }
    ];
    const dataObj = {
        userId: 5,
        date: new Date(),
        products: [...allProducts, product]
    }
    try {
        const response = await fetcher.post('/carts', {
            body: JSON.stringify(dataObj)
        });
        return response.data;
    } catch (ex) {
        console.log(ex)
        return false;
    }
}

