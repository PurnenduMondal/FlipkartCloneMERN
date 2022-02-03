const cloudinary = require("cloudinary");

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.upload = async (req, res) => {
  let uploadedImages = []
  try {
    for(let i = 0; i < req.body.images.length; i++) {
      let result = await cloudinary.uploader.upload(req.body.images[i], {
        public_id: `${Date.now()}`,
        resource_type: "auto", // jpeg, png
      });
      console.log(result.secure_url)
      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }
    res.json(uploadedImages)
  } catch (e) {
    console.error(e);
  }

};

exports.remove = (req, res) => {
  let public_id = req.body.public_id;
  console.table(public_id)
  cloudinary.uploader.destroy(public_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};