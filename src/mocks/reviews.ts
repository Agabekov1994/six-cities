type mockComments = {
  "comment": string,
  "date": string,
  "id": number,
  "rating": number,
  "user": {
    "avatar_url": string,
    "id": number,
    "is_pro": boolean,
    "name": string
  }
}[];

const mockComments = [
  {
    "comment": "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
    "date": "2019-05-08T14:13:56.569Z",
    "id": 1,
    "rating": 4,
    "user": {
      "avatar_url": "img/avatar-max.jpg",
      "id": 4,
      "is_pro": false,
      "name": "Max"
    }
  },
  {
    "comment": "GOOOOOOODyes HOTEL.",
    "date": "2019-05-08T14:13:56.669Z",
    "id": 2,
    "rating": 2,
    "user": {
      "avatar_url": "img/avatar-max.jpg",
      "id": 2,
      "is_pro": false,
      "name": "Alex"
    }
  }
];

export { mockComments};