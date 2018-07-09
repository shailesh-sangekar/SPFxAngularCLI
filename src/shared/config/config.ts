export class Config {

    public static getLogoURL(): string {
         //let LogoURL = 'http://espld205:1234';
        let LogoURL = 'https://espl202:6666/';
        return LogoURL;
    }
    public static GetURL(apiURL: string): string {
        /**UAT */
        //const baseURL = 'http://espl202:5555';
        let baseURL = 'https://espl202:6666/';
        /**Prod */
        // let baseURL = 'http://espl202:5555';
        return baseURL + apiURL;
    }
}