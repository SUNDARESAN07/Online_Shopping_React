
function Main() {
    var conStyle = {
        textAlign: 'center',
        alignSelf: 'center',
        padding:'30vh',
        margin: 'auto',
        color:"black",
    }
    var imgStyle={
        width:150,
        height:150,
        borderRadius:75,
        margin:10
    }
    return (
        <div style={conStyle}>
        <img src="shop-logo.png" alt="app_logo" style={imgStyle}/>
        <h1 >WELCOME TO ONLINE SHOPPING APP</h1>
        </div>
    );
}

export default Main;