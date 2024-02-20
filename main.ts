import app from "./src/app";
import sequelize from "./src/models/config/database";

const PORT = 3000;

sequelize.sync({ force: false })
  .then(async () => {
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error syncing database:', error);
    process.exit(1); 
  });

