
export const apiUrls = {
    products: {
        'products': `${process.env.REACT_APP_API_URL}products`,
        'get': `${process.env.REACT_APP_API_URL}getEmployees`,
        'delete': (id) => `${process.env.REACT_APP_API_URL}deleteEmployee/${id}`,
    },
    solicitude: {
        'create': `${process.env.REACT_APP_API_URL}createSolicitude`,
        'get': `${process.env.REACT_APP_API_URL}getSolicitudes`,
        'delete': (id) => `${process.env.REACT_APP_API_URL}deleteSolicitude/${id}`,


    },
    auth: {
        'create': `${process.env.REACT_APP_API_URL}users`,
        'login': `${process.env.REACT_APP_API_URL}login`,
        'auth': `${process.env.REACT_APP_API_URL}token`,

    }
}