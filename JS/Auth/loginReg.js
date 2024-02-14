if (window.localStorage.getItem("token") !== null) {
  window.location.href = "../../index.html";
}

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

showPass.onclick = () => {
  if (showPass.classList.contains("fa-eye-slash")) {
    showPass.classList.replace("fa-eye-slash", "fa-eye");
    passInp.type = "text";
  } else {
    showPass.classList.replace("fa-eye", "fa-eye-slash");
    passInp.type = "password";
  }
};

home.onclick = () => {
  window.location.href = "../../index.html";
};
