import tails from "./assets/tails.png";

export const dataUsers = {
  1: {
    name: "Sonic",
    bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, natus.",
    location: "The mushroom kingdom",
    pic:
      "https://cdn.vox-cdn.com/thumbor/AVRKydHKlpRjC2ZwpxquoY_Bntk=/0x26:640x453/1200x800/filters:focal(0x26:640x453)/cdn.vox-cdn.com/uploads/chorus_image/image/34182115/sonic.0.jpg",
    friends: [2, 3],
    id: 1
  },
  2: {
    name: "Tails",
    bio: "Hey im Tails.",
    isOnline: true,
    location: "Denmark",
    pic: tails,
    friends: [1],
    id: 2
  },
  3: {
    name: "Knuckles",
    bio: "Red devil",
    isOnline: false,
    location: "Destiny",
    pic: "https://i.pinimg.com/originals/97/48/fd/9748fdc48a24b4b3fa74f0fe30c33fde.png",
    friends: [1],
    id: 3
  }
};
