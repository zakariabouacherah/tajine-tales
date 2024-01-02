import { Children } from "react"
export const Banner = ({children}) => {
    return <section className="banner">
        <h1>{children} </h1>
    </section>
}