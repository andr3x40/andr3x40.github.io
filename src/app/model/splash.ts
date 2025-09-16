export class SplashSpecialRules {

    public month?: number; // undefined means this rule doesn't apply
    public day?: number; // undefined means this rule doesn't apply

}

export class Splash {

    public text!: string;
    public weight!: number;
    public specialRules?: SplashSpecialRules; // undefined means no special rules

    constructor(text: string, weight?: number) {
        this.text = text;
        this.weight = weight !== undefined ? weight : 1;
    }

}

export class SplashList {

    private splashes!: Splash[];

    constructor(splashes: Splash[]) {
        this.splashes = splashes;
    }

    /**
     * Gets a random splash.
     * @returns a random splash
     */
    public roll(): string {
        let currentSplashes: Splash[] = this.splashes.filter((splash) => {
            if (splash.specialRules === undefined) return true; // skip it
            // get the current date
            let today: Date = new Date(Date.now());
            let thisDay: boolean = splash.specialRules.day === undefined ? true : today.getDate() === splash.specialRules.day;
            let thisMonth: boolean = splash.specialRules.month === undefined ? true : today.getMonth() === splash.specialRules.month;
            return thisDay && thisMonth;
        });
        let rollableSplashes: string[] = [];
        for (let splash of currentSplashes) {
            for (let x = 0; x < splash.weight; x++) {
                rollableSplashes.push(splash.text);
            }
        }
        return rollableSplashes[this.rollNumber(rollableSplashes.length)];
    }

    private rollNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }

}