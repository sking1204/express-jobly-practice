const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
//This function generates SQL query components for performing
//partial updates in the database table

//It allows us to dynamically generate SQL components required for updating records
//in the database table based on the data provided
//(it abstracts away the SQL generation logic and helps in maintaining 
//cleaner and more maintainable code)

//It takes to parameters:
//dataToUpdate: object contaiing data that needs to be updated
//key = column name, value = value to replace existing value

//jsToSql: object that maps JavaScript style column names to their corresponding 
//SQL style column names (this ensures consistency between the JavaScript objects
//and the SQL queries)

function sqlForPartialUpdate(dataToUpdate, jsToSql) {

  //validation: checking if any data to update, if not, error is thrown
  

  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']

  //// Here we are extracting the keys (column names) from the dataToUpdateobject
  //For each colun name, we are generating a string that repressents a SQL set 
  //clause
  //If there is a mapping for the column name in jsToSql, it uses the SQL-style 
  //column name from the mapping, otherwise it uses the original column name
  //The index is a placeholder for teh parameterized query and it starts from 1
  //The generated SQL set clauses are stored in an array called 'cols'

  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  // The function returns an object containing two properties: 
  //setCols: this property containsa  comma separated string of teh generated SQL
  //set clauses. This string will be used in the "SET" part of the SQL update
  //query

  //values: this property contains an array of the values extracted from the
  //dataToUpdate object. These values will replace the placeholders in the SQL
  //query

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
