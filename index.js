// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));

delay (100) .then ((() => console.log(getUserData)));

function getUserData(id) {
  const dbs = {
    db1: (db1), 
    db2: (db2),
    db3: (db3)
  };
}

if (id <1 || id > 10) {
  return Promise.reject(new Error("Invalid User ID.  ID MUST be between 1-10"));

}
try{
const dbName= await central(id);
if (!dbs[dbName]) {
  return Promise.reject(new Error("Database ${dbName} is not available!"));
}
} catch (error) {
  console.error("An error occurred:", error);
  return Promise.reject(new Error("An unexpected error occurred while processing the request."));
}
const basicInfo = await dbs[dbName](id);
const personalData = await vault(id);

const userData = {

  id,
  name: personalData.name,
  username: basicInfo.username,
  email: personalData.email,
  address: {
      street: personalData.address.street,
      suite: personalData.address.suite,
      city: personalData.address.city,
      zipcode: personalData.address.zipcode,
      geo: {
          lat: personalData.address.geo.lat,
          lng: personalData.address.geo.lng,
      }
  },
  phone: personalData.phone,
  website: basicInfo.website,
  company: {
      name: basicInfo.company.name,
      catchPhrase: basicInfo.company.catchPhrase,
      bs: basicInfo.company.bs,
  }
}
;
return userData;

try {}

catch (error) {
  if (error.message.includes('db1')) {
      return Promise.reject(new Error("Failed to retrieve data from db1."));
  }
  if (error.message.includes('db2')) {
      return Promise.reject(new Error("Failed to retrieve data from db2."));
  }
  if (error.message.includes('db3')) {
      return Promise.reject(new Error("Failed to retrieve data from db3."));
  }
  if (error.message.includes('vault')) {
      return Promise.reject(new Error("Failed to retrieve data from the vault."));
  }

  return Promise.reject(error);
} 


