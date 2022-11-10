export class Config {
    public  devServer : string = "http://localhost:8080";
    public  preProdServer : string = "http://54.81.151.7:8080";
    public  prodEnv : boolean = true;
    public  backendService : string = this.prodEnv ? this.preProdServer : this.devServer; 
}