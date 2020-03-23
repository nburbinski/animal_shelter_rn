// class Animal {
//   constructor(id, breed, gallery, image, liked, name, type, about, cats, dogs) {
//     this.id = id;
//     this.breed = breed;
//     this.gallery = gallery;
//     this.image = image;
//     this.liked = liked;
//     this.name = name;
//     this.type = type;
//     this.about = about;
//     this.cats = cats;
//     this.dogs = dogs;
//   }
// }

// export default Animal;

// import { Animal } from "./animal";

// class Shelter {
//   constructor(id, name, address, image, animals, uID) {
//     let loadedAnimals = [];
//     for (const key in animals) {
//       loadedAnimals.push(
//         new Animal(
//           key,
//           animals[key].breed,
//           animals[key].gallery,
//           animals[key].image,
//           animals[key].liked,
//           animals[key].name,
//           animals[key].type,
//           animals[key].about,
//           animals[key].cats,
//           animals[key].dogs
//         )
//       );
//     }
//     this.id = id;
//     this.name = name;
//     this.address = address;
//     this.image = image;
//     this.animals = loadedAnimals;
//     this.uID = uID;
//   }
// }

// export default Shelter;
