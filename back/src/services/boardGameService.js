import { BoardGameModel } from "../db/schemas/boardgame";
import {
    rankSort,
    raitngSort,
    userRatedSort,
} from "./sortFuncion/sortFunction";

class boardGameService {
    // 정렬 type 설정
    // service에 이 코드가 존재해도 되는지 궁금 ..??
    static sortType({ type }) {
        switch (type) {
            case "rank":
                return rankSort;
            case "rating":
                return raitngSort;
            case "userRated":
                return userRatedSort;
            default:
                return null;
        }
    }

    // service에서 바로 요청
    static async findAllGames({ page, perPage }) {
        // 모든 보드게임 검색 - 저장된 순서대로 나옴
        const boardgames = await BoardGameModel.find({});
        return boardgames;
    }

    // 최신 게임 전체 조회
    static async findRecentlyGames({ page, perPage }) {
        const boardGames = await BoardGameModel2020.find({});
        return boardGames;
    }

    // game_id로 조회
    static async findByGameId({ gameId }) {
        const games = await BoardGameModel.findOne({ game_id: gameId });
        return games;
    }

    // player 기준 범위 안 보드게임 조회
    static async findByPlayer({ player, type, page, perPage }) {
        const options = {
            $nor: [
                { min_player: { $gt: player } },
                { max_player: { $lt: player } },
            ],
        };

        // 조회할 페이지의 총 개수
        const total = await BoardGameModel.countDocuments(options);
        // 조건에 따른 보드게임 조회
        const games = await BoardGameModel.find(options)
            .sort(this.sortType({ type }))
            .skip(perPage * (page - 1))
            .limit(perPage);
        // 프론트에 전달할 전체 페이지 수
        const totalPage = Math.ceil(total / perPage);

        if (games.length === 0) {
            return new Error("조회된 데이터가 없습니다.");
        }
        return { totalPage, games };
    }

    // 연령별 기준 보드게임 조회
    static async findByAge({ age, type, page, perPage }) {
        const games = await BoardGameModel.find({
            min_age: { $lte: age },
        }).sort(this.sortType({ type }));
        return games;
    }

    // theme 기준 정렬
    static async findByTheme({ theme, type, page, perPage }) {
        const games = await BoardGameModel.find({
            theme: { $in: [theme] },
        }).sort(this.sortType({ type }));
        return games;
    }

    // 시간 기준 정렬
    static async findByTime({ time, type, page, perPage }) {
        const games = await BoardGameModel.find({
            $nor: [
                { min_playing_time: { $gt: time } },
                { max_playing_time: { $lt: time } },
            ],
        }).sort(this.sortType({ type }));

        if (games.length === 0) {
            return new Error("조회된 데이터가 없습니다.");
        }
        return games;
    }

    static async findByComplexity({ complexity, type, page, perPage }) {
        const games = await BoardGameModel.find({
            complexity_average: {
                $gte: Math.floor(complexity),
                $lte: Math.floor(complexity) + 1,
            },
        }).sort(this.sortType({ type }));
        return games;
    }
}

export { boardGameService };
