import User from "../models/User";

class UserController {
  constructor() {}

  async list(req, res) {
    const list = await User.findAll();

    return res.status(200).json(list);
  }

  async store(req, res) {
    const emailExists = await User.findOne({
      where: { email: req.body.email }
    });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: `Email ${emailExists.email} already exists!` });
    }

    const user = await User.create(req.body);

    return res.status(200).json(user);
  }

  async update(req, res) {
    const { email, old_password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ error: `Email: ${email} does not exists!` });
    }

    if (old_password && !(await user.checkPassword(old_password))) {
      return res.status(401).json({ error: `Password does not match!` });
    }

    const newUser = await user.update(req.body);

    return res.status(200).json(newUser);
  }

  async remove(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ error: `Email: ${email} does not exists!` });
    }

    await user.destroy({ where: { email } });

    return res.status(200).json(user);
  }
}

export default new UserController();
