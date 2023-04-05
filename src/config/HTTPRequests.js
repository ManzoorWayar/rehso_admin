const APP_ENV = "development";
const BASE_URL = "http://localhost:5000";
const PRODUCTION_URL = "https://rehso-api.onrender.com"

const URL = APP_ENV === "development" ? BASE_URL : PRODUCTION_URL;


const getCategories = `${URL}/api/v1/admin/packages/categories`

export { URL, getCategories }

