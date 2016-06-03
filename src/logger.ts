export class Log {

    static er(d: string, obj: any = undefined) {
        if (obj !== undefined) console.log(d, obj);
        else console.log(d);
    }

    static setMode() {

    }

}
