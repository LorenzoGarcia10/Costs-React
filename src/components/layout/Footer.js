import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
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
                <li>
                    <a href="https://www.instagram.com/lorenzogdm" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>Costs</span> &copy; 2024
            </p>
        </footer>
    );
}

export default Footer