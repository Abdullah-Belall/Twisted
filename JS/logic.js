if (window.localStorage.getItem("token") !== null) {
  const userName = window.localStorage.getItem("username");
  const Password = window.localStorage.getItem("Password");
  loginOnLoad(userName, Password);
}

function getInfo() {
  let img = window.localStorage.getItem("userPhoto");
  let name = window.localStorage.getItem("name");
  let userName = window.localStorage.getItem("username");
  removeDnone(userNow);
  addDnone(notUser);
  sameUserImg.forEach((e) => {
    e.src = img;
  });
  firstName.forEach((e) => {
    e.innerHTML = name;
  });
  userNameNew.forEach((e) => {
    e.innerHTML = `@` + userName;
  });
}

function logOut(goTo) {
  window.localStorage.clear();
  window.location.href = goTo;
}
