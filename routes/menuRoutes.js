/*
* Routing för de olika menyerna 
*/

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); //Behövs den?
require("dotenv").config();

