const express = require("express")
const config = require("config")
const path = require("path")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ extended: true }))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/link", require("./routes/link.routes"))
app.use("/t", require("./routes/redirect.routes"))

if (process.env.NODE_ENV === "production") {
  // app.use("/", express.static(path.join(__dirname, "client", "build")))
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || config.get("port") || 8080

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () =>
      console.log(`App has beed started on port ${PORT}...`)
    )
  } catch (error) {
    console.log("Server Error", error.message)
    process.exit(1)
  }
}

start()
