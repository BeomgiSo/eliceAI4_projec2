import express from "express";
import cors from "cors";
import { userAuthRouter } from "./routes/userRouter";
import { favoriteAuthRouter } from "./routes/favoriteRouter";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { boardGameRouter } from "./routes/boardGameRouter";
import { communityRouter } from "./routes/communityRouter";


const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userAuthRouter);
app.use(boardGameRouter);
app.use(communityRouter);
app.use(favoriteAuthRouter);

app.use(errorMiddleware);

export { app };
