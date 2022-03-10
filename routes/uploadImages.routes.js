const router = require("express").Router();

const uploadCloud = require("../config/cloudinary");

//Rota para fazer upload da foto no CloudNary
router.post("/", uploadCloud.single("picture"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ message: "Upload falhou" });
    }

    return res.status(201).json({ url: req.file.path });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
});

module.exports = router;
