const getToken=()=>{
    var user = localStorage.getItem("auth_user");
    user = JSON.parse(user);
    const token = user.token;
    return token;
}

export default getToken;