import {useEffect, useState} from "react";
import { createContext } from "react";
import {addCollectionsAndDocuments, getCatecoriesAndDocuments} from "../utils/firebase/firebase.utils";

import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {},

});


export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({})
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCatecoriesAndDocuments()
            console.log(categoriesMap)
            setCategoriesMap(categoriesMap)
        }
        getCategoriesMap()
    }, [])
    // useEffect(() => {
    //     addCollectionsAndDocuments('categories', SHOP_DATA)
    // }, [])
    const value = {categoriesMap}
    return (
        <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider>
    )
}

