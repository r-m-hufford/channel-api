import { Sequelize } from "sequelize";
import { initUser } from "../src/models/user";

const sequelize = new Sequelize('postgresql://ryanmhufford@localhost:6543/channel', {
  logging: console.log
});

initUser(sequelize);

export { sequelize };
