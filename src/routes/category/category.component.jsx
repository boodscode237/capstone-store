import {useParams} from "react-router-dom";
import {CategoriesContext} from "../../contexts/categories.context";
import './category.styles.scss'

import ProductCard from "../../components/product-card/product-card.component";
import {useContext, useState, useEffect, Fragment} from "react";
import {CategoryContainer, Title} from "./category.styles";
const Category = () => {
    const {category} = useParams()
    const {categoriesMap} = useContext(CategoriesContext)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <Title className='category-title'>{category.toLocaleUpperCase()}</Title>
            <CategoryContainer className='category-container'>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
            </CategoryContainer>
        </Fragment>

)
}



export default Category