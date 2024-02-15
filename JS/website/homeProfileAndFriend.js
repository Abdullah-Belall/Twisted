let closePostCon = postCon.querySelector("i");
let closeCommentsCon = commentsCon.querySelector("i");

uploadImg.onchange = () => {
  if (uploadImg.value.split(`\\`).length === 1) {
    labelImg.innerHTML = `Choose Profile Image`;
  } else {
    labelImg.innerHTML = uploadImg.value.split(`\\`)[uploadImg.value.split(`\\`).length - 1];
  }
};
function errs(tit) {
  let newErr = document.createElement("div");
  newErr.classList.add("err", "rounded", "py-2", "px-3", "main-color", "d-flex", "align-items-center", "gap-3");
  newErr.innerHTML = tit;
  let icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-circle-exclamation");
  newErr.prepend(icon);
  errContainer.appendChild(newErr);
  setTimeout(() => {
    if (errContainer.querySelectorAll("div").length !== 0) {
      let oldErr = document.querySelector(".err");
      oldErr.remove();
    }
  }, 5000);
}
sub.onclick = () => {
  checkRegister();
};
closePostCon.onclick = () => {
  createPost.style.opacity = `.8`;
  createPost.style.boxShadow = `0px 0px 0px 0px #000`;
  addDnone(postCon);
};
closeCommentsCon.onclick = () => {
  addDnone(commentsCon);
  removeDnone(noComm);
  for (i = 1; i < document.querySelectorAll(".comm").length; i++) {
    document.querySelectorAll(".comm").forEach((e) => {
      e.remove();
    });
  }
};
function opencommentsCon(postId) {
  removeDnone(commentsCon);
  window.localStorage.setItem("postIdForComm", postId);
  showCommsPost(postId);
}
function makeComments(same) {
  let newComm = comment.cloneNode(true);
  let newCommImg = newComm.querySelector("img");
  let newCommName = newComm.querySelector("h6");
  let newCommBody = newComm.querySelector(".body");
  removeDnone(newComm);
  newCommImg.src = same.author.profile_image;
  newCommImg.setAttribute("onclick", `goFrindPage(${same.author.id})`);
  newCommName.innerHTML = `@` + same.author.username;
  newCommName.setAttribute("onclick", `goFrindPage(${same.author.id})`);
  newCommBody.innerHTML = same.body;
  showComments.appendChild(newComm);
}
commSend.onclick = () => {
  if (commInp.value.length > 1) {
    commentMake();
  } else {
    errs(`Can't post a comment with no litters`);
  }
};

let toTop = document.querySelector(".toTop");

toTop.addEventListener("mouseover", () => {
  toTop.classList.add("fa-bounce");
});
toTop.addEventListener("mouseout", () => {
  toTop.classList.remove("fa-bounce");
});
toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.onscroll = () => {
  if (window.scrollY > 400) {
    toTop.style.right = `20px`;
  } else {
    toTop.style.right = `-50px`;
  }
};
