const { Router } = require("express")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const router = Router()

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Min password's length is 6 characters").isLength({
      min: 6,
    }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: "Incorrect data while signing up",
        })
      }

      const { email, password } = request.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return response
          .status(400)
          .json({ message: "User with the same email already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      response.status(201).json({ message: "User was created" })
    } catch (e) {
      response.status(500).json({ message: "Something went wrong. Try again" })
    }
  }
)

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Type email correctly").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: "Incorrect data while signing in",
        })
      }

      const { email, password } = request.body

      const user = await User.findOne({ email })

      if (!user) {
        return response.status(400).json({ message: "User was not found" })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return response
          .status(400)
          .json({ message: "Incorrect password, try again" })
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      })

      response.json({ token, userId: user.id })
    } catch (e) {
      response.status(500).json({ message: "Something went wrong. Try again" })
    }
  }
)

module.exports = router
