const url_API = "http://localhost:3000/todos";

function navigation(direction) {
    const clearPathname = location.pathname.slice(location.pathname.indexOf("/"), location.pathname.lastIndexOf("/")+1)
    const url = location.origin + clearPathname;
    console.info(`Redirection vers : ${url}${direction}`)
    window.location = url + direction;
}

function getUrl(direction){
    const clearPathname = location.pathname.slice(location.pathname.indexOf("/"), location.pathname.lastIndexOf("/")+1)
    const url = location.origin + clearPathname;
    console.info(`URL demandé : ${url}${direction}`)
    return url + direction;
}