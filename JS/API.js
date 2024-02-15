const baseUrl = "https://tarmeezacademy.com/api/v1/";

function removeDnone(ele) {
  ele.classList.remove("d-none");
}
function addDnone(ele) {
  ele.classList.add("d-none");
}

function getPosts(limit) {
  axios.get(baseUrl + `posts?limit=5&page=${limit}`).then((res) => {
    for (i = 0; i < res.data.data.length; i++) {
      makePosts(res.data.data[i]);
    }
    addDnone(landing);
  });
}

function getUserPosts(id) {
  axios.get(baseUrl + `users/${id}/posts`).then((res) => {
    for (i = 0; i < res.data.data.length; i++) {
      makePosts(res.data.data[i]);
    }
    addDnone(landing);
  });
}

function openEdit(postId) {
  window.localStorage.setItem("postIdEdit", postId);
  removeDnone(landing);
  axios.get(baseUrl + `posts/${postId}`).then((r) => {
    addDnone(landing);
    let same = r.data.data;
    editTitle.value = same.title;
    editBody.value = same.body;
    removeDnone(editCon);
  });
}

function postUserInfo(same, passhel) {
  window.localStorage.setItem("token", same.token);
  window.localStorage.setItem("id", same.user.id);
  window.localStorage.setItem("userPhoto", same.user.profile_image);
  window.localStorage.setItem("name", same.user.name);
  window.localStorage.setItem("username", same.user.username);
  window.localStorage.setItem("Password", passhel);
  window.localStorage.setItem("postsCount", same.user.posts_count);
}

function signUp() {
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  formData.append("image", uploadImg.files[0]);
  formData.append("name", name.value);
  axios
    .post(baseUrl + `register`, formData)
    .then(() => {
      normalLogin(username.value, password.value);
    })
    .catch((err) => {
      addDnone(landing);
      let same = err.response.data.errors;
      if (same.username !== undefined) {
        errs(same.username[0]);
      }
      if (same.image !== undefined) {
        errs(same.image[1]);
      }
      if (same.password !== undefined) {
        errs(same.password[0]);
      }
    });
}

function normalLogin(UName, Pass) {
  axios
    .post(baseUrl + `login`, {
      username: UName,
      password: Pass,
    })
    .then((res) => {
      addDnone(landing);
      postUserInfo(res.data, Pass);
      window.location.href = `../../index.html`;
    })
    .catch((err) => {
      addDnone(landing);
      let same = err.response.data.errors;
      if (same.username !== undefined) {
        errs(same.username[0]);
      }
      if (same.password !== undefined) {
        errs(same.password[0]);
      }
      if (same.email !== undefined) {
        errs(same.email[0]);
      }
    });
}

function loginOnLoad(UName, Pass) {
  axios
    .post(baseUrl + `login`, {
      username: UName,
      password: Pass,
    })
    .then((res) => {
      addDnone(landing);
      postUserInfo(res.data, Pass);
      getInfo();
    })
    .catch(() => {
      window.localStorage.clear();
      addDnone(landing);
      window.location.href = "../Auth/Login.html";
    });
}

function postNPost(goTO) {
  let formData = new FormData();
  formData.append(`title`, name.value);
  formData.append(`body`, body.value);
  formData.append(`image`, uploadImg.files[0]);
  const postToken = {
    authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  axios
    .post(baseUrl + `posts`, formData, {
      headers: postToken,
    })
    .then(() => {
      addDnone(landing);
      window.location.href = goTO;
    })
    .catch((err) => {
      addDnone(landing);
      if (err.response.data.message === "Unauthenticated.") {
        errs("Unauthenticated, Try to refresh the window and try again if it doesn't work call us");
      }
      let same = err.response.data.errors;
      if (same.image !== undefined) {
        errs(same.image[1]);
      }
    });
}

function getFriendInfo(id) {
  axios.get(baseUrl + `users/${id}`).then((res) => {
    let same = res.data.data;
    let friendImg = document.querySelector(".friendImg");
    let friendName = document.querySelector(".friendName");
    let friendUserName = document.querySelector(".friendUserName");
    let friendPostCount = document.querySelector(".friendPostCount span");
    friendImg.src = same.profile_image;
    friendName.innerHTML = same.name;
    friendUserName.innerHTML = `@` + same.username;
    friendPostCount.innerHTML = same.posts_count;
    getFriendPosts(window.localStorage.getItem("friendId"));
  });
}

function getFriendPosts(id) {
  axios.get(baseUrl + `users/${id}/posts`).then((res) => {
    for (i = 0; i < res.data.data.length; i++) {
      makePosts(res.data.data[i]);
    }
    addDnone(landing);
  });
}

function delPost() {
  const postToken = {
    authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  axios
    .delete(baseUrl + `posts/${window.localStorage.getItem("postIdDel")}`, {
      headers: postToken,
    })
    .then(() => {
      addDnone(landing);
      addDnone(delAlert);
      window.localStorage.setItem("postsCount", window.localStorage.getItem("postsCount") - 1);
      window.location.reload();
    })
    .catch(() => {
      addDnone(landing);
      addDnone(delAlert);
      errs("There is a problem, please contact us or try again later");
    });
}

function editUserPost() {
  const postToken = {
    authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  axios
    .put(
      baseUrl + `posts/${window.localStorage.getItem("postIdEdit")}`,
      {
        title: editTitle.value,
        body: editBody.value,
      },
      {
        headers: postToken,
      }
    )
    .then(() => {
      window.location.reload();
    })
    .catch(() => {
      errs("There is a problem, please contact us or try again later");
    });
}

function showCommsPost(postId) {
  axios
    .get(baseUrl + `posts/${postId}`)
    .then((res) => {
      let same = res.data.data.comments;
      if (res.data.data.comments.length != 0) {
        addDnone(noComm);
        addDnone(problem);
        for (i = 0; i < same.length; i++) {
          makeComments(same[i]);
        }
      } else {
        removeDnone(noComm);
      }
    })
    .catch(() => {
      removeDnone(problem);
    });
}

function commentMake() {
  const postToken = {
    authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };
  let postId = window.localStorage.getItem("postIdForComm");
  axios
    .post(
      baseUrl + `posts/${postId}/comments`,
      {
        body: commInp.value,
      },
      {
        headers: postToken,
      }
    )
    .then((res) => {
      makeComments(res.data.data);
      addDnone(noComm);
      commInp.value = "";
    })
    .catch(() => {
      errs("You have to login first");
    });
}
