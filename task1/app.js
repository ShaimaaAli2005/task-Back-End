const yargs=require("yargs");
const data=require("./data");

yargs.command({
    command:'add',
    describe:"Add a new person",
    builder:{
      id:{
        describe:'person ID',
        demandOption:true,
        type:'string'
      },
      fname:{
        describe:'fname',
        demandOption:true,
        type:'string'
      },
      lname:{
        describe:'lname',
        demandOption:true,
        type:'string'
      },
      age:{
        describe:'age',
        demandOption:true,
        type:'string'
      },
      city:{
        describe:'city',
        demandOption:true,
        type:'string'
      }
    },
    handler:(x)=>{
        data.addPerson(x.id,x.fname,x.lname,x.age,x.city);
    } 
});
// 2. read
yargs.command({
  command: 'read',
  describe: 'Read a specific person by ID',
  builder: {
    id: { describe: 'Person ID', demandOption: true, type: 'string' }
  },
  handler:(x)=> {
    data.readPerson(x.id);
  }
});
// 2. list
yargs.command({
  command: 'list',
  describe: 'List all people',
  handler:() =>{
    data.listAllPeople();
  }
});

// 3. delete
yargs.command({
  command: 'delete',
  describe: 'Delete a specific person by ID',
  builder: {
    id: { describe: 'Person ID',
         demandOption: true,
          type: 'string' }
  },
  handler:(x)=> {
    data.deletePerson(x.id);
  }
});
// 3. deleteAll
yargs.command({
  command: 'deleteAll',
  describe: 'Delete all people',
  handler() {
    data.deleteAllPeople();
  }
});
// 4. list name,city
yargs.command({
  command: 'listNames',
  describe: 'List full names and cities for all people',
  handler:()=> {
    data.listFullNamesAndCities();
  }
});
yargs.parse();