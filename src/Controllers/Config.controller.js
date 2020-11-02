class Config{
    constructor(){
        //backend server details
        this.host = "http://localhost:";
        // this.host = "http://saleserp-env.eba-u2mkdt2x.us-east-2.elasticbeanstalk.com";
        this.port = "4000";
        this.password = "";
    }

}

var obj = new Config();
export default obj;