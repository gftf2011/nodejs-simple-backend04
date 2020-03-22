export const emailExists = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: `'email' field does not exists!` });
  }

  return next();
};

export const passwordExists = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: `'password' field does not exists!` });
  }

  return next();
};

export const oldPasswordExists = (req, res, next) => {
  const { old_password } = req.body;

  if (!old_password) {
    return res
      .status(400)
      .json({ error: `'old_password' field does not exists!` });
  }

  return next();
};

export const nameExists = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: `'name' field does not exists!` });
  }

  return next();
};
