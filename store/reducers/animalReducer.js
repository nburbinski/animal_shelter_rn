import { TOGGLE_LIKE, FILTERED_LIST, SET_FILTERS } from "../actions/actions";

const initialState = {
  animals: [
    {
      id: "1",
      name: "Rufus",
      type: "Dog",
      breed: "Jack Russel Terrier",
      image:
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: true
    },
    {
      id: "2",
      name: "LadyBird",
      type: "Dog",
      breed: "Jack Russel Terrier",
      image:
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: false
    },
    {
      id: "3",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image:
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: false
    },
    {
      id: "4",
      name: "Bongo",
      type: "Dog",
      breed: "Schnauzer",
      image: "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
      gallery: [
        "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
        "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
        "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg"
      ],
      liked: false
    },
    {
      id: "5",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image: "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: false
    },
    {
      id: "6",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image: "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: false
    },
    {
      id: "7",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image: "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_3215.jpg",
      gallery: [
        "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_3215.jpg",
        "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_3215.jpg",
        "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_3215.jpg"
      ],
      liked: false
    }
  ],
  filteredAnimals: [
    {
      id: "1",
      name: "Rufus",
      type: "Dog",
      breed: "Jack Russel Terrier",
      image:
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: true
    },
    {
      id: "2",
      name: "LadyBird",
      type: "Dog",
      breed: "Jack Russel Terrier",
      image:
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: false
    },
    {
      id: "3",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image:
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: false
    },
    {
      id: "4",
      name: "Bongo",
      type: "Dog",
      breed: "Schnauzer",
      image: "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
      gallery: [
        "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
        "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
        "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg"
      ],
      liked: false
    },
    {
      id: "5",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image: "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: false
    },
    {
      id: "6",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image: "https://images-ra.adoptapet.com/seo/1/ff/837_ff.jpg",
      gallery: [
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg",
        "https://i.pinimg.com/originals/71/70/9d/71709dd49a99fbc76d7bcbd1576548e6.jpg"
      ],
      liked: false
    },
    {
      id: "7",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image: "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_3215.jpg",
      gallery: [
        "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_3215.jpg",
        "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_3215.jpg",
        "https://images.dog.ceo/breeds/schnauzer-giant/n02097130_3215.jpg"
      ],
      liked: false
    }
  ]
};

export const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE:
      const newState = state.animals.map(animal =>
        animal.id === action.animalID
          ? { ...animal, liked: !animal.liked }
          : animal
      );
      return { ...state, filteredAnimals: newState };
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredAnimals = state.animals.filter(animal => {
        if (appliedFilters.isBreed && animal.breed !== appliedFilters.breed)
          return false;
        if (appliedFilters.isType && animal.type !== appliedFilters.type)
          return false;

        return true;
      });
      return { ...state, filteredAnimals: filteredAnimals };
    default:
      return state;
  }
};
