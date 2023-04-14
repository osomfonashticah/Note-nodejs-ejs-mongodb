exports.homepage = async (req, res) => {
  const locals = {
    title: "Nodejs",
    description: "Free Nodejs Notes App",
  };
  res.render("index", {
    locals,
    layout: "../views/layouts/front-page",
  });
};

exports.about = async (req, res) => {
  const locals = {
    title: "About - Nodejs",
    description: "Free Nodejs Notes App",
  };
  res.render("about", locals);
};
