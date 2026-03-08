export const validateMenu = [
  (req, res, next) => {
    if (!req.body.productName || req.body.productName.trim() === '') {
      return res.status(400).json({ errors: ['Product name is required'] });
    }
    if (req.body.productName.length < 3) {
      return res.status(400).json({ errors: ['Name must be at least 3 characters'] });
    }
    if (!req.body.productPrice) {
      return res.status(400).json({ errors: ['Price is required'] });
    }
    if (isNaN(req.body.productPrice) || Number(req.body.productPrice) < 0) {
      return res.status(400).json({ errors: ['Price must be a positive number'] });
    }
    if (!req.body.productCategory || req.body.productCategory.trim() === '') {
      return res.status(400).json({ errors: ['Category is required'] });
    }
    if (!req.body.productDescription || req.body.productDescription.trim() === '') {
      return res.status(400).json({ errors: ['Description is required'] });
    }
    if (req.body.productDescription.length < 10) {
      return res.status(400).json({ errors: ['Description must be at least 10 characters'] });
    }
    if (!req.file) {
      return res.status(400).json({ errors: ['Image is required'] });
    }

    next();
  }
];