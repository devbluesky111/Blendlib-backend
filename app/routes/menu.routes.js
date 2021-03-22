module.exports = app => {
  const menuModule = require("../controllers/menu.controller.js");
  
  app.post("/get_menu", menuModule.getAll);
  app.post("/get_menu_o", menuModule.getAll_o);
  app.post("/add_menu", menuModule.create);
  app.post("/edit_menu", menuModule.edit);
  app.post("/delete_menu", menuModule.delete);
  
  app.post("/get_submenu_o", menuModule.getAllSubMenu_o);
  app.post("/get_submenu", menuModule.getAllSubMenu);
  app.post("/add_submenu", menuModule.createSubMenu);
  app.post("/edit_submenu", menuModule.editSubMenu);
  app.post("/delete_submenu", menuModule.deleteSubMenu);
}