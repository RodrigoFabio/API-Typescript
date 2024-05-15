import express, {Response} from "express";
import router from "./Routes";
import "reflect-metadata"
import { AppDataSource } from "./Config/DataSource";
const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(()=>{
  console.log("banco de dados conectado")
}).catch(erro => {console.log("Erro")})
app.get("/", (_, res: Response) => {
  res.send("Bem vindo ao curso de TypeScript!");
});

export default app;
