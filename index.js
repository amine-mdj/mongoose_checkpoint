const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://aminerate:<password>>@cluster0.oorf4hy.mongodb.net/?retryWrites=true&w=majority');
}

//// 1 Person Prototype 

const Schema = mongoose.Schema
const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [{
    type: String
}]
})
const Person = mongoose.model('Person', personSchema)

// 2 Create and Save a Record of a Model

const createAndSavePerson = function() {
    const human = new Person({name: 'Harrison', age: 25, favouriteFoods: ['pizza', 'indian']})
    human.save(function(err){
      if (err) {
        console.log(err)
      }
      else {
        console.log("seccess")
      }
    })
  }

  // createAndSavePerson();


   // 3 Create Many Records with model.create()
   var createManyPeople = function(arrayOfPeople) {
    Person.create(arrayOfPeople, function(err) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("success")
      }
    })
  }

  arrayOfPeople = [{name: 'james', age: 30, favouriteFoods: ['paella', 'cheese']}
  ,{name: 'lebron', age: 35, favouriteFoods: ['tacos', 'fajitas']}
  ,{name: 'henry', age: 40, favouriteFoods: ['couscous', 'chtitha']}]  

   // createManyPeople(arrayOfPeople);

   // 4 Use model.find() to Search Your Database

   var findPeopleByName = function(personName) {
    const person = Person.find({name: personName}, function(err, data){
      if (err) {
        console.log(err)
      }
      else {
         console.log( "person's informations :" + data)
      }
    })
  }

  // findPeopleByName("james");

  // 5 Use model.findOne() 

  var findOneByFood = function(food){
    const person = Person.findOne({favoriteFoods: food}, function(err, data){
      if (err) {
        console.log(err)
      }
      else {
        console.log( "person's informations :" + data)
      }
    })
  }

  // findOneByFood("pizza");

  // 6 Use `Model.findById()

  var findPersonById = function(personId) {
    const person = Person.findById({_id: personId}, function(err, data){
      if (err) {
        console.log(err)
      }
      else {
        console.log( "person's informations :" + data)
      }
    })
  };

  // findPersonById('63371883080ee66f787829fb');  

  // 7 Perform Classic Updates by Running Find, Edit, then Save

  var findEditThenSave = function(personId, food) {
    const itemToAdd = food
    const person = Person.findById({_id: personId}, function(err, data){
      if (err) {
        console.log(err)
      }
      data.favoriteFoods.push(itemToAdd)
      data.save(function(err, data){
        if (err) {
          console.log(err)
        }
        else {
          console.log("secsess")
        }
      })
    })
  }

  // findEditThenSave('63371883080ee66f787829fb' , 'hambourger')

  // 8 Perform New Updates on a Document Using model.findOneAndUpdate()

  var findAndUpdate = function(personName) {
    var ageToSet = 20
    const person = Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, function(err, data){
      if (err) {
        console.log(err)
      }
      else {
        console.log("midified person :" + data)
      }
    })
  }

  // findAndUpdate("henry");

  // 9 Delete One Document Using model.findByIdAndRemove

  var removeById = function(personId) {
    const person = Person.findByIdAndRemove({_id: personId}, function(err, data){
      if (err) {
        console.log(err)
      }
      else {
        console.log("midified deleted :" + data)
      }
    })
  }

  // removeById('63371a1acc5cfd23c4677f02');

  // 10 Delete Many Documents with model.remove()

  var removeManyPeople = function(personName) {
    var nameToRemove = personName;
    const person = Person.remove({name: nameToRemove}, function(err, data){
      if (err) {
        console.log(err)
      }
      else {
        console.log(data)
      }
    })
  }

 // removeManyPeople("Harrison"); 

 // 11 Chain Search Query Helpers to Narrow Search Results

 var queryChain = function(foodliked) {
  var foodToSearch = foodliked;
  const people = Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data){
    if (err) {
      console.log(err)
    }
    else {
      console.log(data)
    }
  })
}

// queryChain('burritos');







