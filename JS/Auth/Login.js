loginSub.addEventListener("click", () => {
  normalLogin(userNameLogin.value, password.value);
});

profilePage.onclick = () => {
  if (window.localStorage.getItem("token") === null) {
    window.location.reload();
  } else {
    window.location.href = "../website/Profile.html";
  }
};

reg.onclick = () => {
  window.location.href = "Register.html";
};

signup.onclick = () => {
  window.location.href = "Register.html";
};

loginBtn.forEach((e) => {
  e.addEventListener("click", () => {
    alert("The data entered will not be saved");
    window.location.reload();
  });
});
