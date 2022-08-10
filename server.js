import express, { Router } from "express";
import dotenv from "dotenv";
import colors from "colors";
import xml from "xml";
import xmlparser from "express-xml-bodyparser";
import xml2js from "xml2js";

dotenv.config();

const app = express();
const router = express.Router();
// const Router = router()
// app.use(express.json()); // body parsing

app.use(xmlparser());

const PORT = process.env.PORT || 5000;

// let data = {
//   zuhair: [
//     {
//       name: "sakharkar",
//     },
//   ],
// };

app.get("/", (req, res) => {
  res.send("API is Running!");
});

router.get("/xml2js/", function (req, res, next) {
  res.render("xml2js", {});
});

// xml2js and express-xml-bodyparser example: retrieve customer using XML
router.post("/xml2js/customer", (req, res, next) => {
  console.log("Raw XML: " + req.rawBody);
  console.log("Parsed XML: " + JSON.stringify(req.body));
  if (req.body.retrieveCustomer) {
    var id = req.body.retrieveCustomer.id;
    res.send(
      `<customer><id>${id}</id><fullName>Bob Smith</fullName></customer>`
    );
  } else {
    res
      .status(400)
      .send("Unexpected XML received, missing <retrieveCustomer> tag");
  }
});

// app.get("/getRates&Availability", (req, res) => {
//   const query = req.query;

//   if (query.type === "xml") {
//     res.set("Content-type", "text/xml");
//     return res.send(xml(data, true));
//   } else {
//     res.send(data);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.yellow.bold);
});
