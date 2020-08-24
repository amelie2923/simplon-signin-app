const fs = require('fs');
const readline = require('readline');
const axios = require('axios');

var controller = {}

controller.getData = async (req, res) => {
  try {
    const url = "https://spreadsheets.google.com/feeds/cells/1Z5A_I7_RQKOjAXyDgn9_scbLA7YVTYBAC1G64orWb-E/1/public/full?alt=json"
    const response = await axios.get(url);
    let getSheetsData = response.data.feed.entry;

    var learner = [];
    var date = [];
    var former = [];

    // getSheetsData.forEach(element => {
      //Pour push uniquement les éléments sous la première ligne après "Apprenants"
      // if (element.gs$cell.col === '1' && element.gs$cell.inputValue !="Apprenants"){
      //     learner.push(element.gs$cell.inputValue)
      // }
    // })

    console.log(getSheetsData);
  } catch (error) {
    console.error(error);
  }
}

module.exports = controller;