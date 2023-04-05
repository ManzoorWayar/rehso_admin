import { URL } from '../config/HTTPRequests'

const assetURI = (path) => {
    if (path) return `${URL}/${path.replace(/\\+/g, "/")}`

    return path
}

export {
    assetURI
}