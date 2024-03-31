import { log } from "console";

//Logger
class SmartHomeLogger {

    private logs: string[] = [];
    private static instance: SmartHomeLogger | null = null;

    // constructor
    constructor() {
        if (!SmartHomeLogger.instance) {
            SmartHomeLogger.instance = this;
        }
    }
    static getInstance() {
        if (!SmartHomeLogger.instance) {
            SmartHomeLogger.instance = new SmartHomeLogger();
        }
        return SmartHomeLogger.instance;
    }

    log(message: string) {
        this.logs.push(message);
        console.log("SmartHomeLog", message);
    }
    printLogCount() {
        console.log("SmartHomeLogCount", this.logs.length, "Logs");

    }

}

const logger = new SmartHomeLogger();
Object.freeze(logger);

export default logger;