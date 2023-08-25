import Head from 'next/head';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './style.module.scss'; // Importe o arquivo CSS
import { Header } from '@/src/components/Header';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contato - JOGOS ENTRE AMIGOS</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Contato para amistoso</h1>

          <div className={styles.contactCard}>
            <div className={styles.cardImage}>
              <img src="/img/local.JPG" alt="Team Logo" width={600} height={300} />
            </div>
            <h2 className={styles.cardTitle}>↓ Marque seu jogo</h2>
            <div className={styles.cardIcons}>
              <a href="https://www.instagram.com/benz.ikafc/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} />
              </a>
              <a href="https://wa.me/+5535999183801" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={30} />
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContactPage;
