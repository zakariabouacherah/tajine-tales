import {Layout} from "../../layouts/Layout"
import { ContactBody } from "./ContactBody"
import { ContactBanner } from "./contactBanner"
import "./style.css"

export const Contact = () => {
    return (
        <Layout>
            <ContactBanner/>
            <ContactBody />
        </Layout>
    )
}