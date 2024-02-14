profilePage.onclick = () => {
  if (window.localStorage.getItem("token") === null) {
    window.location.href = "../Auth/Login.html";
  } else {
    window.location.href = "Profile.html";
  }
};
home.onclick = () => {
  window.location.href = "../../index.html";
};

removeDnone(landing);

getFriendInfo(window.localStorage.getItem("friendId"));

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
  userName.innerHTML = `@` + base.author.username;
  postPhoto.src = base.image;
  time.innerHTML = base.created_at;
  title.innerHTML = base.title;
  desc.innerHTML = base.body;
  comments.innerHTML = `(${base.comments_count})`;
  showComs.setAttribute("onclick", `opencommentsCon(${base.id})`);
  allPosts.appendChild(clonePost);
}

reg.onclick = () => {
  window.location.href = "../Auth/Register.html";
};
loginBtn.forEach((e) => {
  e.addEventListener("click", () => {
    window.location.href = "../Auth/Login.html";
  });
});
createPost.onclick = () => {
  if (window.localStorage.getItem("token") !== null) {
    createPost.style.opacity = `1`;
    createPost.style.boxShadow = `0px 0px 16px -1px #000`;
    removeDnone(postCon);
  } else {
    window.location.href = "../Auth/Login.html";
  }
};
async function goFrindPage(userId) {
  window.localStorage.setItem("friendId", userId);
  const me = window.localStorage.getItem("id");
  const friend = window.localStorage.getItem("friendId");
  if (me == friend) {
    window.location.href = `Profile.html`;
  } else {
    window.location.href = `profileFriend.html`;
  }
}
logout.onclick = () => {
  logOut(`../../index.html`);
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
    postNPost(`./Profile.html`);
  }
}
