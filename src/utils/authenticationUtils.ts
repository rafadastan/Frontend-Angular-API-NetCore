//declarando as constantes..
const USUARIO = "usuario";
const ACCESS_TOKEN = "accessToken";

//função para autenticar o usuário
export function signIn(usuario: any, accessToken: any): void {

    window.localStorage.setItem(USUARIO, JSON.stringify(usuario));
    window.localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
}

//função para logout do usuário
export function signOut(): void {

    window.localStorage.removeItem(USUARIO);
    window.localStorage.removeItem(ACCESS_TOKEN);    
}

//função para verificar se o usuário está autenticado
export function isAuthenticated(): boolean {

    //verificar se existe um TOKEN de autenticação na localstorage
    var accessToken = window.localStorage.getItem(ACCESS_TOKEN);

    if(accessToken != null)
    {
        var auth = JSON.parse(window.localStorage.getItem(ACCESS_TOKEN));
        return new Date(auth.expiration).getDate() >= new Date().getDate();
    }
    
    return false;
}

//função para retornar os dados do usuário autenticado
export function getUserData() : any {
    var user = JSON.parse(window.localStorage.getItem(USUARIO));
    return user;
}

//função para retornar o token do usuário
export function getAccessToken() : string {
    var accessToken = JSON.parse(window.localStorage.getItem(ACCESS_TOKEN));
    return accessToken.bearerToken;
}

//função para redirecionar para a página de login
export function redirectToLoginPage(){
    window.location.href = "/";
}

//função para redirecionar para a página de admin
export function redirectToAdminPage(){
    window.location.href = "/admin";
}
