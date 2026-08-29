const fs=require('fs')
//loadData
const loadInfo=()=>{
    try{
        const dataJson=fs.readFileSync('data10.json').toString();
        return JSON.parse(dataJson)
    }
    catch{
        return[]
    }
}
//saveData
const saveData=(allData)=>{
    const allDataJson=JSON.stringify(allData);
    fs.writeFileSync('data10.json',allDataJson);
}
//Add person
const addPerson=(id,fname,lname,age,city)=>{
    const allData=loadInfo();
    const duplicatedData=allData.filter((obj)=>{
        return obj.id===id;
    })
    if(duplicatedData.length===0){
        allData.push({
            id:id,
            fname:fname,
            lname:lname,
            city:city,
            age:age
        })
        saveData(allData);
        console.log("person added successfully!");
    }else{
        console.log("ERROR:ID ALREADY EXISTS!");
    }
}
// 2. readPerson
const readPerson = (id) => {
  const allData = loadData();
  const person = allData.find((obj) => obj.id === id);

  if (person) {
    console.log('\n--Person Details--');
    console.log(`ID: ${person.id}`);
    console.log(`Full Name: ${person.fname} ${person.lname}`);
    console.log(`Age: ${person.age}`);
    console.log(`City: ${person.city}`);
  } else {
    console.log(`Person with ID: ${id} not found.`);
  }
};

// 2. list
const listAllPeople = () => {
  const allData = loadData();
  if (allData.length === 0) {
    console.log('No people found.');
    return;
  }
  console.log('\n--All People --');
  console.table(allData);
};

// 3. delete
const deletePerson = (id) => {
  const allData = loadData();
  const dataToKeep = allData.filter((obj) => obj.id !== id);

  if (allData.length > dataToKeep.length) {
    saveAllData(dataToKeep);
    console.log(`Person with ID: ${id} deleted successfully.`);
  } else {
    console.log(`Person with ID: ${id} not found.`);
  }
};

// 3. deleteAll
const deleteAllPeople = () => {
  saveAllData([]);
  console.log('All people deleted successfully.');
};

// 4. list(name,city)
const listFullNamesAndCities = () => {
  const allData = loadData();
  if (allData.length === 0) {
    console.log('⚠️ No people found.');
    return;
  }
  console.log('\n--- Full Names & Cities ---');
  allData.forEach((person) => {
    console.log(`Full Name: ${person.fname} ${person.lname} | City: ${person.city}`);
  });
};

// Export
module.exports = {
  addPerson,
  readPerson,
  listAllPeople,
  deletePerson,
  deleteAllPeople,
  listFullNamesAndCities
};