
type Values = {
    nombre : string
    valor : string
    dias : number
}

export const setCookie = (values : Values) : void => {
    const { nombre, valor, dias } = values
    let expires = "";
    if (dias) {
        let date = new Date();
        date.setTime(date.getTime() + dias * 24 *60 *60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    
    document.cookie = nombre + "=" + (valor || "") + expires + "; path=/";
    
}


export const getCookie = (name : string) : string => {
    const cookies = document?.cookie
    const valor = 
    cookies
        ?.split(';')
        ?.filter(cookie => cookie.includes(`${name}=`))[0]
        ?.split('=')[1]
    return valor
}

