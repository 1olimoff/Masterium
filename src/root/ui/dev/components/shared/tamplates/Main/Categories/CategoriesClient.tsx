import ServerLink from "../../../elements/Links/ServerLink"
import { MainCategoryItem } from "../../../elements/categories/MainCategoryItem"
import React from "react"


// check
interface Props {
    categories: any
}


export const CategoriesClient = ({categories} : Props) => {


    return (
        <div className={"flex gap-4 px-2 min-w-max md:gap-6 md:px-4"}>
        {
            categories.map((category) => (
                <ServerLink key={category.id} path={`services/${category.name}`}>
                  <MainCategoryItem
                    iconPath={`${process.env.NEXT_PUBLIC_BASE_URL}${category.icon}`}
                    title={category.name}
                    alt={category.name}
                  />
                </ServerLink>
              ))
              
        }
    </div>
    )
}