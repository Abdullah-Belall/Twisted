uploadImg.onchange = () => {
  if (uploadImg.value.split(`\\`).length === 1) {
    labelImg.innerHTML = `Choose Profile Image`;
    done.style.opacity = `0`;
  } else {
    labelImg.innerHTML = uploadImg.value.split(`\\`)[uploadImg.value.split(`\\`).length - 1];
  }
  let span = document.createElement("span");
  span.classList.add("position-absolute", "done");
  let svg = document.createElement("i");
  svg.classList.add("fa-solid", "fa-square-check");
  span.appendChild(svg);
  labelImg.appendChild(span);
};

showPass.onclick = () => {
  if (showPass.classList.contains("fa-eye-slash")) {
    showPass.classList.replace("fa-eye-slash", "fa-eye");
    passInp.type = "text";
  } else {
    showPass.classList.replace("fa-eye", "fa-eye-slash");
    passInp.type = "password";
  }
};

function checkRegister() {
  if (name.value.length < 2) {
    errs("The name must not be less than two letters");
    sub.classList.remove("name-k", "username-k");
  } else {
    sub.classList.add("name-k");
  }
  if (username.value.length < 5) {
    errs("The username must not be less than five letters");
    sub.classList.remove("name-k", "username-k");
  } else {
    sub.classList.add("username-k");
  }
  if (sub.classList.contains("name-k") && sub.classList.contains("username-k")) {
    removeDnone(landing);
    signUp();
  }
}

sub.onclick = () => {
  checkRegister();
};

profilePage.onclick = () => {
  if (window.localStorage.getItem("token") === null) {
    window.location.href = "Login.html";
  } else {
    window.location.href = "../website/Profile.html";
  }
};

reg.onclick = () => {
  alert("The data entered will not be saved");
  window.location.reload();
};
loginBtn.forEach((e) => {
  e.addEventListener("click", () => {
    window.location.href = "Login.html";
  });
});
