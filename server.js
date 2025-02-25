require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const BusinessSchema = new mongoose.Schema({ name: String, phone: String, category: String });
const Business = mongoose.model("Business", BusinessSchema);

app.get("/api/businesses", async (req, res) => {
  const businesses = await Business.find();
  res.json(businesses);
});

app.post("/api/businesses", async (req, res) => {
  const newBusiness = new Business(req.body);
  await newBusiness.save();
  res.json({ message: "Business added!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
