const getAccess = () => {
    var type = false;
    var user = localStorage.getItem("auth_user");
    if (!user) {
        type = false;
    }
    else {
        user = JSON.parse(user);
        if (user.type === "admin") {
            type = true;
        }
    }
    return type;
}

export default getAccess;