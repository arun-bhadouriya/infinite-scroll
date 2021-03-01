const loader = document.getElementById("loader");
const imgContainer = document.getElementById("img-container");
// const image = ;

let img = "";
let loaded;
function createImages(data) {
  data.forEach((i) => {
    img += `<a href="${i.links.html}" target="_blank"> <img
          id="img"
          src="${i.urls.full}"
          alt="${i.alt_description}"
          title="${i.alt_description}"
          /></a>`;
  });
}

async function getImg() {
  loader.style.display = "flex";
  const apiUrl =
    "https://api.unsplash.com/photos/random/?client_id=fvgms2zc4NZuQeZtZ4jM6Pru4bpfPnZyDyNQ-d8321o&count=10";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    // createImages(data);
    // console.log(img);
    createImages(data);
    loader.style.display = "none";
    imgContainer.innerHTML = img;
    document.getElementById("img").addEventListener("load", () => {
      loaded = true;
      loader.style.display = "none";
      // console.log("loaded all images previously ,load more");
    });
  } catch (error) {
    if (error) console.log(error);
  }
}

//infinite scroll functionality
let limit = 5000;
window.addEventListener("scroll", () => {
  // if (window.scrollY > limit) {
  //   console.log("scroled");
  //   getImg();
  //   limit += 4000;
  // }
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    if (loaded) {
      getImg();
      // console.log("load more");
      loaded = false;
    }
  }
});

getImg();
