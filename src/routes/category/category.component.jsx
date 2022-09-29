import {useParams} from "react-router-dom";
import './category.styles.scss'

import ProductCard from "../../components/product-card/product-card.component";
import { useState, useEffect, Fragment} from "react";
import {CategoryContainer, Title} from "./category.styles";
import {useSelector} from "react-redux";
import {selectCategoriesMap, selectIsCategoriesIsLoading} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.styles";
const Category = () => {
    const {category} = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectIsCategoriesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <Title className='category-title'>{category.toLocaleUpperCase()}</Title>
            {
                isLoading ? (
                    <Spinner/>
                    ):(
                    <CategoryContainer className='category-container'>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                    </CategoryContainer>
                )
            }

        </Fragment>
)
}



export default Category