const url_API = "https://totolist-back.vercel.app/todos";

// Fait la direction entre les différentes pages du site
function navigation(direction) {
    const clearPathname = location.pathname.slice(location.pathname.indexOf("/"), location.pathname.lastIndexOf("/")+1)
    const url = location.origin + clearPathname;
    console.info(`Redirection vers : ${url}${direction}`)
    window.location = url + direction;
}

// Retourne une url donné
function getUrl(direction){
    const clearPathname = location.pathname.slice(location.pathname.indexOf("/"), location.pathname.lastIndexOf("/")+1)
    const url = location.origin + clearPathname;
    console.info(`URL demandé : ${url}${direction}`)
    return url + direction;
}