import express from "express";
import fetch from "node-fetch";
import xml2js from "xml2js";

const router = express.Router();
const parser = new xml2js.Parser();

router.get("/getAllBookings", async (req, res) => {
  const response = await fetch(
    "https://supply.agoda.com/api?apiKey=f9b88888-d34e-411a-a73b-685dfe28a9d0",
    {
      method: "post",
      body: `<?xml version="1.0" encoding="UTF-8"?>
      <request timestamp="1659975544021" type="9">
          <criteria from="2022-08-11T09:28:00+07:00" to="2022-08-11T09:54:29+07:00">
              
          </criteria>
      </request>`,
      headers: { "content-type": "text/xml; charset=utf-8" },
    }
  );
  const data = await response.text();
  parser.parseString(data, (err, result) => {
    res.json(result);
  });
});

//   const currentTime = '1660044970777';

router.get("/getSelectedBookings", async (req, res) => {
  const response = await fetch(
    "https://supply.agoda.com/api?apiKey=f9b88888-d34e-411a-a73b-685dfe28a9d0",
    {
      method: "post",
      body: `<?xml version="1.0" encoding="UTF-8"?>
      <request timestamp="1659975544021" type="3" >
          <criteria from="2022-08-01T14:00:00+07:00" to="2022-09-15T15:00:00+07:00">
              <property id="5950804"/>
          </criteria>
      </request>`,
      headers: { "content-type": "text/xml; charset=utf-8" },
    }
  );
  const data = await response.text();
  parser.parseString(data, (err, result) => {
    res.json(result);
  });
});

router.get("/getBookingsRetrieval", async (req, res) => {
  const response = await fetch(
    "https://supply.agoda.com/api?apiKey=f9b88888-d34e-411a-a73b-685dfe28a9d0",
    {
      method: "post",
      body: `<?xml version="1.0" encoding="UTF-8"?>

      <request timestamp="1660285430188" type="4">
      
         <criteria >
      
           <property id="5950804">
      
               <booking id="752374117"/>
          </property>
      
          </criteria>
      
       </request>`,
      headers: { "content-type": "text/xml; charset=utf-8" },
    }
  );
  const data = await response.text();
  parser.parseString(data, (err, result) => {
    res.json(result);
  });
});

export default router;
