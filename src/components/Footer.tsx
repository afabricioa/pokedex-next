import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <p><span>Pokedex criada por Fabrício <Link href="https://github.com/afabricioa"><a>GitHub</a></Link></span> &copy; 2022</p>
        </footer>
    )
}