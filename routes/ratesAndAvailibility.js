import express, { response } from "express";
import fetch from "node-fetch";
import xml2js from "xml2js";
const router = express.Router();

const parser = new xml2js.Parser();

//Current Date
const currentDate = new Date().toLocaleDateString().split("/");
const newCurrentDate = [];
for (let i = 0; i < currentDate.length; i++) {
  if (currentDate[i] < 10) {
    currentDate[i] = 0 + currentDate[i];
  }
  newCurrentDate.push(currentDate[i]);
}
currentDate.reverse();
const currDate = currentDate.join("-");

// Sevens Days
const sevenDaysDate = new Date();
sevenDaysDate.setDate(sevenDaysDate.getDate() + 6);
const sevenDays = sevenDaysDate.toLocaleDateString().split("/");
const newSevenDays = [];
for (let i = 0; i < sevenDays.length; i++) {
  if (sevenDays[i] < 10) {
    sevenDays[i] = 0 + sevenDays[i];
  }
  newSevenDays.push(sevenDays[i]);
}
sevenDays.reverse();
const nextSevenDay = sevenDays.join("-");

// Property Data of Seven Days With All Rooms
router.get("/propertyData", async (req, res) => {
  // console.log(currDate, nextSevenDay);
  const response = await fetch(
    "https://supply.agoda.com/api?apiKey=f9b88888-d34e-411a-a73b-685dfe28a9d0",
    {
      method: "post",
      body: `<request timestamp="1436931804" type="11">

        <criteria from='${currDate}' to='${nextSevenDay}'>
       
         <property id="5950804" />
       
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
    "https://supply.agoda.com/api?apiKey=f9b88888-d34e-411a-a73b-685dfe28a9d0",
    {
      method: "post",
      body: `<request timestamp="1436931804" type="11">

        <criteria from='${currDate}' to='${nextSevenDay}'>
       
         <property id="5950804" room_id="109614900" />
       
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
    "https://supply.agoda.com/api?apiKey=f9b88888-d34e-411a-a73b-685dfe28a9d0",
    {
      method: "post",
      body: `<request timestamp="1436931804" type="11">

        <criteria from='${currDate}' to='${nextSevenDay}'>
       
         <property id="5950804" room_id="109614900" rateplan_id="2377448" />
       
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

// Set Rates And Availability Route
router.get("/setRatesAndAvailibility", async (req, res) => {
  const response = await fetch(
    "https://sandbox-distribution-xml.agoda.com/api?apiKey=110d2bdc-1a7d-479f-8822-2f5d096afb79",
    {
      method: "post",
      body: `<request timestamp="1660276699" type="10">

      <criteria property_id="263492">
    
      <inventory>
    
       <update room_id="3046309">
    
        <date_range from='${currDate}' to='${nextSevenDay}'>
    
         <dow>1</dow>
    
         <dow>2</dow>
    
         <dow>3</dow>
    
         <dow>4</dow>
    
         <dow>5</dow>
    
         <dow>6</dow>
    
         <dow>7</dow>
    
        </date_range>
    
        <allotment>9</allotment>
    
        <restrictions>
    
         <closed>false</closed>
    
         <ctd>false</ctd>
    
         <cta>false</cta>
    
        </restrictions>
    
       </update>
    
      </inventory>
    
      <rate>
    
       <update room_id="3046309" rateplan_id="3471717">
    
        <date_range from='${currDate}' to='${nextSevenDay}'>
    
        <prices currency="USD">
    
         <deviation base_price="4000.0">
    
          <occupancy person="1" amount="0.0"/>
    
          <occupancy person="2" amount="100.0"/>
    
          <occupancy person="3" amount="200.0"/>
    
          <occupancy person="4" amount="300.0"/>
    
          <occupancy person="5" amount="400.0"/>
    
          <occupancy person="6" amount="500.0"/>
    
         </deviation>
    
        </prices>
    
        <restrictions>
    
         <closed>false</closed>
    
         <ctd>false</ctd>
    
         <cta>false</cta>
    
         <los>
    
          <min>1</min>
    
          <max>30</max>
    
         </los>
    
         <advancepurchase>
    
           <min>15</min>
    
           <max>30</max>
    
         </advancepurchase>
    
         <staythrough>
    
          <min>1</min>
    
         </staythrough>
    
        </restrictions>
    
       </update>
    
      </rate>
    
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
