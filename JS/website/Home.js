removeDnone(landing);
let currentPage = 1;
getPosts(1);

function makePosts(base) {
  let clonePost = post.cloneNode(true);
  let userPhoto = clonePost.querySelector(".userPhoto");
  let userName = clonePost.querySelector(".userName");
  let postPhoto = clonePost.querySelector(".postPhoto");
  let time = clonePost.querySelector(".time");
  let title = clonePost.querySelector(".title");
  let desc = clonePost.querySelector(".desc");
  let comments = clonePost.querySelector(".comments");
  let showComs = clonePost.querySelector(".showComs");
  removeDnone(clonePost);
  userPhoto.src = base.author.profile_image;
  userPhoto.setAttribute("onclick", `goFrindPage(${base.author.id})`);
  userName.innerHTML = `@` + base.author.username;
  userName.setAttribute("onclick", `goFrindPage(${base.author.id})`);
  postPhoto.src = base.image;
  time.innerHTML = base.created_at;
  title.innerHTML = base.title;
  desc.innerHTML = base.body;
  comments.innerHTML = base.comments_count;
  showComs.setAttribute("onclick", `opencommentsCon(${base.id})`);
  allPosts.appendChild(clonePost);
}

profilePage.onclick = () => {
  if (window.localStorage.getItem("token") === null) {
    window.location.href = "./Pages/Auth/Login.html";
  } else {
    window.location.href = "./Pages/website/Profile.html";
  }
};
home.onclick = () => {
  window.location.reload();
};

reg.onclick = () => {
  window.location.href = "./Pages/Auth/Register.html";
};
loginBtn.forEach((e) => {
  e.addEventListener("click", () => {
    window.location.href = "./Pages/Auth/Login.html";
  });
});
createPost.onclick = () => {
  if (window.localStorage.getItem("token") !== null) {
    createPost.style.opacity = `1`;
    createPost.style.boxShadow = `0px 0px 16px -1px #000`;
    removeDnone(postCon);
  } else {
    window.location.href = "./Pages/Auth/Login.html";
  }
};
window.addEventListener("scroll", () => {
  const endOfPage = window.scrollY + window.innerHeight + 4 >= document.body.offsetHeight;
  if (endOfPage) {
    currentPage += 1;
    getPosts(currentPage);
  }
});

async function goFrindPage(userId) {
  window.localStorage.setItem("friendId", userId);
  const me = window.localStorage.getItem("id");
  const friend = window.localStorage.getItem("friendId");
  if (me == friend) {
    window.location.href = `./Pages/website/Profile.html`;
  } else {
    window.location.href = `./Pages/website/profileFriend.html`;
  }
}

logout.onclick = () => {
  window.localStorage.clear();
  window.location.reload();
};

function checkRegister() {
  if (body.value.length < 5) {
    errs("The body must not be less than five letters");
    sub.classList.remove("username-k");
  } else {
    sub.classList.add("username-k");
  }
  if (sub.classList.contains("username-k")) {
    removeDnone(landing);
    postNPost(`./index.html`);
  }
}
