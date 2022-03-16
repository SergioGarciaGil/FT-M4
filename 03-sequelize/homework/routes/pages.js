const router = require("express").Router();
const { Page, User } = require("../models");

router.post("/", function (req, res) {
  // Modificar para que cuando se clickee el botón de "SUBMIT" se cree un nuevo post
  // tomando los datos desde el form y agregándolo a la base de datos
  // (Debe incluir también la categoría a la/s cual/es pertenece)
  // Tu código acá:
  const { title, content, authorEmail, authorName, categories } = req.body;

  const user = await User.findOrCreate({
    //findOrCreate busac el usuario y si no lo encuentra lo crea
    where: {
      email: authorEmail,
      name: authorName,
    },
  });
  const page = await Page.create({
    title: title,
    content: content,
  });
  await user[0].addPage(page);
  await page.addCategories(categories);
  res.redirect(page.route);
});

router.get("/add", function (req, res) {
  res.render("addpage");
});

router.get("/:urlTitle", function (req, res) {
  // Modificar para que cuando se seleccione un "Page" en particular se muestren
  // los datos asociados al mismo
  // Tu código acá:
  const { urlTitle } = req.params;
  const page = await Page.findOne({
    where: {
      urlTitle: urlTitle,
    },
  });
});

module.exports = router;
