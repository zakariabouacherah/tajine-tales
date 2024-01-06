import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faEnvelope, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";

export const ContactInfos = () => {
    const infos = [
        {
            icon : faEnvelope ,
            title : "info@tajinetales.com"
        },
        {
            icon : faPhone ,
            title : "+212 612 123 123"
        },
        {
            icon : faMapPin ,
            title : "Agadir 80 000, Morocco"
        },
        {
            icon : faClock ,
            title : "24/7j"
        },
    ]

    return (
        <section className="contact-info">
            <h1>Infos</h1>
            <ul className="infos-list">
                {infos.map((info, index)=> (
                    <li key={index} className="infos-item">
                        <FontAwesomeIcon icon={info.icon} />
                        <span>{info.title} </span>
                    </li>
                ))}
            </ul>

        </section>
    )
}