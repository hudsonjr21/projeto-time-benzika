import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'
import { FiMap, FiMapPin, FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import { ModalGame } from '../../components/ModalGame'
import Modal from 'react-modal';
import { FaFutbol, FaMapMarkedAlt } from 'react-icons/fa';

type GameProps = {
  id: string;
  day: string;
  numberGame: string | number;
  draft: boolean;
  match: string;
  location: string;
}

interface HomeProps{
  games: GameProps[];
}

export type GameDetailProps = {
  id: string;
  score: number;
  game_id: string;
  player_id: string;
  player:{
    id: string;
    name: string;
    profile: string;
    position: string;
    birthday: string;
  }
  game:{
    id: string;
    day: string | number;
    match: string;
    numberGame: string | number;
    home_team_id: string;
    away_team_id: string;
    location: string;
  }
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export default function Dashboard({ games }: HomeProps){

  const [gameList, setGameList] = useState(games || [])

  const [modalGameDetail, setModalGameDetail] = useState<GameDetailProps[]>()
  const [modalVisible, setModalVisible] = useState(false);


  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string){
   
     const apiClient = setupAPIClient(); 

     const response = await apiClient.get('/game/detail', {
      params:{
        game_id: id,
       } 
     })

     setModalGameDetail(response.data);
     setModalVisible(true);

  }


  async function handleRefreshOrders(){
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/games')
    setGameList(response.data);

  }

  Modal.setAppElement('#__next');

  return(
    <>
    <Head>
      <title>Painel - JOGOS ENTRE AMIGOS</title>
    </Head>
    <div>
      <Header/>
    
      <main className={styles.container}>

        <div className={styles.containerHeader}>
          <h1>Últimos Jogos</h1>
          <button onClick={handleRefreshOrders}>
            <FiRefreshCcw size={25} color="#3fffa3"/>
          </button>
        </div>

        <article className={styles.listOrders}>

          {gameList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum Jogo adicionado foi encontrado...
            </span>
          )}

          {gameList.map( gameDetail => (
              <section  key={gameDetail.id} className={styles.orderItem}> 
                <button onClick={ () => handleOpenModalView(gameDetail.id) }>
                  <div className={styles.tag}></div>
                  <span>
                    <FaFutbol size={18} /> Jogo {gameDetail.match} - Dia: {formatDate(gameDetail.day as string)} 
                    <div className={styles.pContent}>
                      <p><FaMapMarkedAlt size={18} /> {gameDetail.location}</p>
                    </div>
                  </span>
                </button>
              </section>
            ))}
                 
        </article>

      </main>

      { modalVisible && (
        <ModalGame
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          game={modalGameDetail}
        />
      )}

    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/games');
  //console.log(response.data);


  return {
    props: {
      games: response.data
    }
  }
})