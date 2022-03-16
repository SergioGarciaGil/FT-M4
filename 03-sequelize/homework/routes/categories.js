const { Page, Category } = require("../models");
const router = require("express").Router();

router.get("/", async function (req, res) {
  // Modificar para devolver los datos de todas las categorias existentes
  // Tu código acá:
  const categories = await Category.findAll();
  res.json(categories);
});

router.get("/:idCategory", function (req, res) {
  // Modificar para que cuando se seleccione una "Category" en particular se muestren
  // todas las páginas que estén dentro de dicha categoría
  // Tu código acá:
  const { id } = req.params;
  const category = Category.findByPk(id, {
    include: Pages,
  });
  res.json(category);
});

module.exports = router;
