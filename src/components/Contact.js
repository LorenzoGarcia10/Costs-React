import styles from './Contact.module.css'

import { FaLinkedin, FaGithub } from 'react-icons/fa'

function Contact() {
    return (
        <><div className={styles.contact}>
            <h1>CONTATO</h1>
            <p>Esse foi o meu projeto COSTS, se você gostou, e quiser ver outros projetos feitos por mim</p>
            <p>Segue abaixo meu Linkedin e meu GitHub:</p>
        </div><div className={styles.social_list}>
                <ul>
                    <li>
                        <a href='https://www.linkedin.com/in/lorenzo-garcia-a306202b0?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2FTZAXJSfQMGaar185gS6iQ%3D%3D' target='_blank' rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/LorenzoGarcia10" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                    </li>
                </ul>
            </div></>
    )
}

export default Contact;