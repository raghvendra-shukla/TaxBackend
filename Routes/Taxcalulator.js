// routes/pricing.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const calculateTotalincome=(GrossAnnualIncome,ExtraIncome,AgeGroup,Deductions)=>{
    const totalincome=GrossAnnualIncome+ExtraIncome-Deductions;
    if(totalincome<=800000){
        return totalincome;
    }
    let tax=0;
    if(AgeGroup<40){
        //30% tax
        tax=0.3*(totalincome-800000);
    }
    else if(AgeGroup>=40 && AgeGroup<60){
        //40% tax
        tax=0.4*(totalincome-800000);
    }
    else{
        //10% tax for above 60
        tax=0.1*(totalincome-800000);
    }
    return totalincome-tax;
  }

router.post("/totalincome",[
    body("GrossAnnualIncome").isNumeric(),
    body("ExtraIncome").isNumeric(),
    body("AgeGroup").isNumeric(),
    body("Deductions").isNumeric()
  ],async (req, res) => {
  try {
    const {GrossAnnualIncome,ExtraIncome,AgeGroup,Deductions} = req.body

    const totalincome =calculateTotalincome( GrossAnnualIncome,ExtraIncome,AgeGroup,Deductions);

    res.json({ total_income:totalincome });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=router