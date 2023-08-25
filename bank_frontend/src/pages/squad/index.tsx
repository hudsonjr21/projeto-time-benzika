import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import PlayerCard from '../../components/PlayerCard';
import { setupAPIClient } from '@/src/services/api';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { Header } from '@/src/components/Header';

type Player = {
  id: string;
  name: string;
  position_id: string;
  profile: string;
  profileImage: string;
};

const SquadPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/player');
        const playersWithProfileImages = response.data.map((player: Player) => ({
          ...player,
          profileImage: `/profile-images/${player.profile}`, // Monta o caminho da imagem
        }));
        setPlayers(playersWithProfileImages);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);


return(
  <>
    <Head>
    <title>Elenco - JOGOS ENTRE AMIGOS</title>
    </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <h1>Elenco</h1>

          <div className={styles.playerList}>
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                name={player.name}
                positionId={player.position_id}
                profileImage={player.profileImage} // Passe a prop profileImage
              />
            ))}
          </div>
        </main>
      </div>
  </>
  )
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
      props: {},
    };
  });

export default SquadPage;