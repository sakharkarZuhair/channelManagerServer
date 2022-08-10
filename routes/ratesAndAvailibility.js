import express from "express";
import fetch from "node-fetch";
import xml2js from "xml2js";
const router = express.Router();

const parser = new xml2js.Parser();

// Property Data of Seven Days With All Rooms
router.get("/propertyData", async (req, res) => {
  const response = await fetch(
    "https://sandbox-distribution-xml.agoda.com/api?apiKey=110d2bdc-1a7d-479f-8822-2f5d096afb79",
    {
      method: "post",
      body: `<request timestamp="1436931804" type="11">

        <criteria from="2022-08-10" to="2022-08-16">
       
         <property id="263492" />
       
        </criteria>
       
       </request>`,
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    }
  );
  const data = await response.text();
  parser.parseString(data, (err, result) => {
    res.json(result);
  });
});

// Single RoomID Data Without RatePlan ID
router.get("/notRatePlans", async (req, res) => {
  const response = await fetch(
    "https://sandbox-distribution-xml.agoda.com/api?apiKey=110d2bdc-1a7d-479f-8822-2f5d096afb79",
    {
      method: "post",
      body: `<request timestamp="1436931804" type="11">

        <criteria from="2022-08-10" to="2022-08-16">
       
         <property id="263492" room_id="3046309" />
       
        </criteria>
       
       </request>`,
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    }
  );
  const data = await response.text();
  parser.parseString(data, (err, result) => {
    res.json(result);
  });
});

// Single Property > RoomID Data For 7 Days With RatePlan ID
router.get("/singleProperty7DaysData", async (req, res) => {
  const response = await fetch(
    "https://sandbox-distribution-xml.agoda.com/api?apiKey=110d2bdc-1a7d-479f-8822-2f5d096afb79",
    {
      method: "post",
      body: `<request timestamp="1436931804" type="11">

        <criteria from="2022-08-10" to="2022-08-16">
       
         <property id="263492" room_id="3046309" rateplan_id="3471717" />
       
        </criteria>
       
       </request>`,
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    }
  );
  const data = await response.text();
  parser.parseString(data, (err, result) => {
    res.json(result);
  });
});

export default router;
