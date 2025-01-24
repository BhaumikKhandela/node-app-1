"use strict";
const express = require("express");
const cluster = require("cluster");
const os = require("os");
console.log("OS Type:", os.type());
console.log("OS Platform:", os.platform());
console.log("OS Architecture:", os.arch());
console.log("CPU Details:", os.cpus().length);
