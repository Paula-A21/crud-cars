import app from "./src/app";
import configureDI, { AppDIContainer } from "./src/config/di";
import { IDbConnection } from "./src/config/sequelizeConfig";
import configureRouter from "./src/routes";

const PORT = 3000;

async function startServer() {
    const diContainer: AppDIContainer = configureDI();

    const dbConnection: IDbConnection = diContainer.get('dbConnection');

    await dbConnection.sync({ force: false });
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        configureRouter(app, diContainer);
    });

}

startServer().catch(error => {
    console.error('Error starting server:', error);
    process.exit(1);
});
