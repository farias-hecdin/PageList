const data = [
  {
    parent: "0",
    id: "_Learning",
    title: "Learning",
    topics: [
      {
        parent: "_Learning",
        id: "_Languages",
        title: "Languages",
        lists: [
          {
            parent: "_Languages",
            id: "_English",
            title: "English",
            bookmarks: [
              {
                parent: "_English",
                id: "vRokr",
                title: "Duolingo - The free, fun, and effective way to learn a language!",
                url: "https://www.duolingo.com",
              },
            ],
          },
        ],
      },
      {
        parent: "_Learning",
        id: "_Programming",
        title: "Programming",
        lists: [
          {
            parent: "_Programming",
            id: "_JavaScript",
            title: "JavaScript",
            bookmarks: [
              {
                parent: "_JavaScript",
                id: "d4Coe",
                title: "Javascript.info - The Modern JavaScript Tutorial",
                url: "https://javascript.info",
              },
              {
                parent: "_JavaScript",
                id: "uL4Do",
                title: "MDN Web Docs",
                url: "https://developer.mozilla.org",
              },
            ],
          },
          {
            parent: "_Programming",
            id: "_Python",
            title: "Python",
            bookmarks: [
              {
                parent: "_Python",
                id: "u54DX",
                title: "Programiz - Learn programming for Free",
                url: "https://www.programiz.com/python-programming",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    parent: "0",
    id: "_Personal",
    title: "Personal",
    topics: [
      {
        parent: "_Personal",
        id: "_News",
        title: "News",
        lists: [],
      },
    ],
  },
];

const value = data.topics.map((data) => {
  return [data.title];
});

console.log(value);
