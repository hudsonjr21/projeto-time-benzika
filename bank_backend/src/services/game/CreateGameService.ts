import prismaClient from "../../prisma";

interface GameRequest{
  numberGame: number;
  day: string;
  homeTeam: string;
  awayTeam: string;
  match: string;
  location: string;
}

class CreateGameService{
  async execute({ numberGame, day, match, location, homeTeam, awayTeam}: GameRequest ){

    const existingGame = await prismaClient.game.findFirst({
      where: {
        numberGame: numberGame,
      },
    });

    if (existingGame) {
      throw new Error('Este número de jogo já está em uso.');
    }

    const game = await prismaClient.game.create({
      data:{
        numberGame,
        day,
        match,
        location,
        home_team_id: homeTeam,
        away_team_id: awayTeam,

      }
    })


    return game;

  }
}

export { CreateGameService }