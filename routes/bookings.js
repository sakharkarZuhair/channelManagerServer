import express from 'express';
import fetch from 'node-fetch';
import xml2js from 'xml2js';

const router = express.Router();
const parser = new xml2js.Parser();

router.get("/getSelectedBookings", async (req, res) => {
    const response = await fetch('https://sandbox-distribution-xml.agoda.com/api?apiKey=110d2bdc-1a7d-479f-8822-2f5d096afb79', {
      method: 'post',
      body: `
    <request timestamp="1436931804" type="3">
    
       <criteria from="2022-08-01T00:00:00+07:00" to="2022-08-10T00:00:00+07:00" status="AmendBooking">
    
      <property id="263492"/>
    
       </criteria>     
    
    </request> `,
      headers: {"content-type": "text/xml; charset=utf-8"}
  });
  const data = await response.text();
    parser.parseString(data,(err,result)=>{
        res.json(result);
    });
  });
  
//   const currentTime = '1660044970777';
  
router.get("/getAllBookings", async (req, res) => {
    const response = await fetch('https://sandbox-distribution-xml.agoda.com/api?apiKey=110d2bdc-1a7d-479f-8822-2f5d096afb79', {
      method: 'post',
      body: `<?xml version="1.0" encoding="UTF-8"?>
    <request timestamp="1660038022528" type="9">
  
    <criteria from="2022-08-01T14:00:00+07:00" to="2022-08-01T15:00:00+07:00">
    
    </criteria> 
    
    </request>`,
      headers: {"content-type": "text/xml; charset=utf-8"}
  });
  const data = await response.text();
    parser.parseString(data,(err,result)=>{
        res.json(result);
    });
  });

  export default router;