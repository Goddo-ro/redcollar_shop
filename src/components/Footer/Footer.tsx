import Snowfall from 'src/assets/icons/snowflake.svg';
import Redcollar from 'src/assets/icons/redcollar.svg';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <span>nonameshop©2024</span>
            <img src={Snowfall} alt="img" />
            <div>
                <img className={styles['footer__logo']} src={Redcollar} alt="logo" />
                <span>made in red collar</span>
            </div>
        </footer>
    );
};

export default Footer;