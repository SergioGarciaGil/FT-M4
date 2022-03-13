var { Sequelize, DataTypes } = require("sequelize");
const S = Sequelize;
var db = new Sequelize("postgres://postgres:admin@localhost:5432/henryblog", {
  logging: false,
});

const Page = db.define("page", {
  // Tu código acá:
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "closed"),
  },
  route: {
    type: DataTypes.VIRTUAL,
    get() {
      return `/pages/${this.urlTitle}`;
    },
  },
});

// .addHook() method
Page.beforeValidate(
  (page) =>
    (page.urlTitle = `page.title.replace(/\s+/g, '_').replace(/\W/g, '')`)
);

const User = db.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, //   ue sea unico que no se repita en otros registros
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Category = db.define("category", {
  // Tu código acá:
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});

// Vincular User con Page
// Tu código acá:
User.hasMany(Page); //in usuario puede tener muchas paginas
Page.belongsTo(User); // una pagina puede tener muchos usuarios

Page.belongsToMany(Category, { through: "Page_Category" }); //una pagina pertenece a muchas categorias
Category.belongsToMany(Page, { through: "Page_Category" });
module.exports = {
  User,
  Page,
  Category,
  db,
};
