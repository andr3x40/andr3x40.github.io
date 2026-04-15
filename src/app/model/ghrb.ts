export class Track {
    public id!: number | undefined;
    public title?: string;
    public artist?: string;
    public album?: string;
    public albumLink?: string;
    public year?: string;
    public genre?: string;
    public length?: number;
    public minimumBpm?: number;
    public maximumBpm?: number;
}

export class Chart {
    public id!: number | undefined;
    public track!: Track | undefined;
    public variants!: Variant[];
    public releaseDate?: string;
    public downloadLink?: string;
    public source?: string;
    public description?: string;

    public youtubeLink?: string;
    public spotifyLink?: string;
    public soundcloudLink?: string;
    public bandcampLink?: string;

    public public!: boolean;
    public tags?: string;

    public static cloneWithoutVariants(chart: Chart): Chart {
        let output: Chart = new Chart();

        output.id = chart.id;
        output.track = chart.track;
        output.releaseDate = chart.releaseDate;
        output.downloadLink = chart.downloadLink;
        output.source = chart.source;
        output.description = chart.description;
        output.spotifyLink = chart.spotifyLink;
        output.youtubeLink = chart.youtubeLink;
        output.soundcloudLink = chart.soundcloudLink;
        output.bandcampLink = chart.bandcampLink;

        return output;
    }

    public static clone(chart: Chart): Chart {
        let output: Chart = Chart.cloneWithoutVariants(chart);
        output.variants = chart.variants;
        return output;
    }

}

export class Variant {
    public id!: number | undefined;
    public charter?: string;
    public gamemode?: string;
    public difficulty?: string;
    public intensity?: number;
    public difficultyCode!: number;

    public tags?: string;
}

export interface ChartFileProperty {
    key: string,
    value: string
}

export interface ChartFileElement {
    position: string,
    value: string
}

export interface ChartFileVariant {
    gamemode: string,
    difficulty: string,
    elements: ChartFileElement[];
}

export class ChartFileData {

    public song: ChartFileProperty[] = [];
    public syncTrack: ChartFileElement[] = [];
    public events: ChartFileElement[] = [];
    public expertSingle: ChartFileElement[] = [];
    public hardSingle: ChartFileElement[] = [];
    public mediumSingle: ChartFileElement[] = [];
    public easySingle: ChartFileElement[] = [];
    public expertDoubleGuitar: ChartFileElement[] = [];
    public hardDoubleGuitar: ChartFileElement[] = [];
    public mediumDoubleGuitar: ChartFileElement[] = [];
    public easyDoubleGuitar: ChartFileElement[] = [];
    public expertDoubleBass: ChartFileElement[] = [];
    public hardDoubleBass: ChartFileElement[] = [];
    public mediumDoubleBass: ChartFileElement[] = [];
    public easyDoubleBass: ChartFileElement[] = [];
    public expertDoubleRhythm: ChartFileElement[] = [];
    public hardDoubleRhythm: ChartFileElement[] = [];
    public mediumDoubleRhythm: ChartFileElement[] = [];
    public easyDoubleRhythm: ChartFileElement[] = [];
    public expertGHLGuitar: ChartFileElement[] = [];
    public hardGHLGuitar: ChartFileElement[] = [];
    public mediumGHLGuitar: ChartFileElement[] = [];
    public easyGHLGuitar: ChartFileElement[] = [];
    public expertGHLCoop: ChartFileElement[] = [];
    public hardGHLCoop: ChartFileElement[] = [];
    public mediumGHLCoop: ChartFileElement[] = [];
    public easyGHLCoop: ChartFileElement[] = [];
    public expertGHLBass: ChartFileElement[] = [];
    public hardGHLBass: ChartFileElement[] = [];
    public mediumGHLBass: ChartFileElement[] = [];
    public easyGHLBass: ChartFileElement[] = [];
    public expertGHLRhythm: ChartFileElement[] = [];
    public hardGHLRhythm: ChartFileElement[] = [];
    public mediumGHLRhythm: ChartFileElement[] = [];
    public easyGHLRhythm: ChartFileElement[] = [];
    public expertDrums: ChartFileElement[] = [];
    public hardDrums: ChartFileElement[] = [];
    public mediumDrums: ChartFileElement[] = [];
    public easyDrums: ChartFileElement[] = [];
    public expertKeyboard: ChartFileElement[] = [];
    public hardKeyboard: ChartFileElement[] = [];
    public mediumKeyboard: ChartFileElement[] = [];
    public easyKeyboard: ChartFileElement[] = [];

}

export class ChartFile {

    public data!: ChartFileData;

    constructor(data: ChartFileData) {
        this.data = data;
    }

    get variantNames(): string[] {
        return [
            'expertSingle', 'hardSingle', 'mediumSingle', 'easySingle',
            'expertDoubleGuitar', 'hardDoubleGuitar', 'mediumDoubleGuitar', 'easyDoubleGuitar',
            'expertDoubleBass', 'hardDoubleBass', 'mediumDoubleBass', 'easyDoubleBass',
            'expertDoubleRhythm', 'hardDoubleRhythm', 'mediumDoubleRhythm', 'easyDoubleRhythm',
            'expertGHLGuitar', 'hardGHLGuitar', 'mediumGHLGuitar', 'easyGHLGuitar',
            'expertGHLCoop', 'hardGHLCoop', 'mediumGHLCoop', 'easyGHLCoop',
            'expertGHLBass', 'hardGHLBass', 'mediumGHLBass', 'easyGHLBass',
            'expertGHLRhythm', 'hardGHLRhythm', 'mediumGHLRhythm', 'easyGHLRhythm',
            'expertDrums', 'hardDrums', 'mediumDrums', 'easyDrums',
            'expertKeyboard', 'hardKeyboard', 'mediumKeyboard', 'easyKeyboard'
        ];
    }

    private getVariant(name: string, elements: ChartFileElement[]): ChartFileVariant {
        switch (name) {
            case 'expertSingle': return {gamemode: "5 Fret Lead Guitar", difficulty: "Expert", elements: elements}
            case 'hardSingle': return {gamemode: "5 Fret Lead Guitar", difficulty: "Hard", elements: elements}
            case 'mediumSingle': return {gamemode: "5 Fret Lead Guitar", difficulty: "Medium", elements: elements}
            case 'easySingle': return {gamemode: "5 Fret Lead Guitar", difficulty: "Easy", elements: elements}
            case 'expertDoubleGuitar': return {gamemode: "5 Fret Co-op Guitar", difficulty: "Expert", elements: elements}
            case 'hardDoubleGuitar': return {gamemode: "5 Fret Co-op Guitar", difficulty: "Hard", elements: elements}
            case 'mediumDoubleGuitar': return {gamemode: "5 Fret Co-op Guitar", difficulty: "Medium", elements: elements}
            case 'easyDoubleGuitar': return {gamemode: "5 Fret Co-op Guitar", difficulty: "Easy", elements: elements}
            case 'expertDoubleBass': return {gamemode: "5 Fret Bass Guitar", difficulty: "Expert", elements: elements}
            case 'hardDoubleBass': return {gamemode: "5 Fret Bass Guitar", difficulty: "Hard", elements: elements}
            case 'mediumDoubleBass': return {gamemode: "5 Fret Bass Guitar", difficulty: "Medium", elements: elements}
            case 'easyDoubleBass': return {gamemode: "5 Fret Bass Guitar", difficulty: "Easy", elements: elements}
            case 'expertDoubleRhythm': return {gamemode: "5 Fret Rhythm Guitar", difficulty: "Expert", elements: elements}
            case 'hardDoubleRhythm': return {gamemode: "5 Fret Rhythm Guitar", difficulty: "Hard", elements: elements}
            case 'mediumDoubleRhythm': return {gamemode: "5 Fret Rhythm Guitar", difficulty: "Medium", elements: elements}
            case 'easyDoubleRhythm': return {gamemode: "5 Fret Rhythm Guitar", difficulty: "Easy", elements: elements}
            case 'expertGHLGuitar': return {gamemode: "6 Fret Lead Guitar", difficulty: "Expert", elements: elements}
            case 'hardGHLGuitar': return {gamemode: "6 Fret Lead Guitar", difficulty: "Hard", elements: elements}
            case 'mediumGHLGuitar': return {gamemode: "6 Fret Lead Guitar", difficulty: "Medium", elements: elements}
            case 'easyGHLGuitar': return {gamemode: "6 Fret Lead Guitar", difficulty: "Easy", elements: elements}
            case 'expertGHLCoop': return {gamemode: "6 Fret Co-op Guitar", difficulty: "Expert", elements: elements}
            case 'hardGHLCoop': return {gamemode: "6 Fret Co-op Guitar", difficulty: "Hard", elements: elements}
            case 'mediumGHLCoop': return {gamemode: "6 Fret Co-op Guitar", difficulty: "Medium", elements: elements}
            case 'easyGHLCoop': return {gamemode: "6 Fret Co-op Guitar", difficulty: "Easy", elements: elements}
            case 'expertGHLBass': return {gamemode: "6 Fret Bass Guitar", difficulty: "Expert", elements: elements}
            case 'hardGHLBass': return {gamemode: "6 Fret Bass Guitar", difficulty: "Hard", elements: elements}
            case 'mediumGHLBass': return {gamemode: "6 Fret Bass Guitar", difficulty: "Medium", elements: elements}
            case 'easyGHLBass': return {gamemode: "6 Fret Bass Guitar", difficulty: "Easy", elements: elements}
            case 'expertGHLRhythm': return {gamemode: "6 Fret Rhythm Guitar", difficulty: "Expert", elements: elements}
            case 'hardGHLRhythm': return {gamemode: "6 Fret Rhythm Guitar", difficulty: "Hard", elements: elements}
            case 'mediumGHLRhythm': return {gamemode: "6 Fret Rhythm Guitar", difficulty: "Medium", elements: elements}
            case 'easyGHLRhythm': return {gamemode: "6 Fret Rhythm Guitar", difficulty: "Easy", elements: elements}
            case 'expertDrums': return {gamemode: "Drums", difficulty: "Expert", elements: elements}
            case 'hardDrums': return {gamemode: "Drums", difficulty: "Hard", elements: elements}
            case 'mediumDrums': return {gamemode: "Drums", difficulty: "Medium", elements: elements}
            case 'easyDrums': return {gamemode: "Drums", difficulty: "Easy", elements: elements}
            case 'expertKeyboard': return {gamemode: "Keyboard", difficulty: "Expert", elements: elements}
            case 'hardKeyboard': return {gamemode: "Keyboard", difficulty: "Hard", elements: elements}
            case 'mediumKeyboard': return {gamemode: "Keyboard", difficulty: "Medium", elements: elements}
            case 'easyKeyboard': return {gamemode: "Keyboard", difficulty: "Easy", elements: elements}
            default: return {gamemode: "Unknown", difficulty: "Unknown", elements: elements}
        }
    }

    get variants(): ChartFileVariant[] {
        let output: ChartFileVariant[] = [];
        type CFDK = keyof ChartFileData;
        for (let variant of this.variantNames) {
            let elements: ChartFileElement[] | ChartFileProperty[] = this.data[variant as CFDK];
            // I'm sure it's ChartFileElement[] btw
            if (elements.length > 0) {
                output.push(this.getVariant(variant, elements as ChartFileElement[]));
            }
        }
        return output;
    }

}

export class IniFileData {

    public name!: string;
    public artist!: string;
    public album!: string;
    public genre!: string;
    public year!: string;
    public songLength!: string;
    public charter!: string;
    public diffBand!: string;
    public diffGuitar!: string;
    public diffBass!: string;
    public diffRhythm!: string; 
    public diffGuitarCoop!: string;
    public diffGuitarGhl!: string;
    public diffBassGhl!: string;
    public diffRhythmGhl!: string; 
    public diffGuitarCoopGhl!: string;
    public diffKeys!: string; 
    public diffDrums!: string;
    public icon!: string;
    public playlistTrack!: string;
    public albumTrack!: string;
    public loadingPhrase!: string;

}

export class IniFile {

    public data!: IniFileData;

    constructor(data: IniFileData) {
        this.data = data;
    }

}

export class ChartFileReader {

    private reader: FileReader;

    constructor() {
        this.reader = new FileReader();
    }

    public async read(file: File): Promise<ChartFile> {
        // make a Promise so the program can wait for readAsText()
        // that damn thing is asynchronous but doesn't return a Promise. sounds good /s
        return new Promise((resolve, reject) => {
            let output: ChartFileData = new ChartFileData();
            this.reader.onload = (event) => {
                const fileContent: string = this.reader.result as string;
                const lines: string[] = fileContent.split('\n');
                type ChartFileKey = keyof typeof output;
                // set the status
                const status = {
                    currentFragment: "",
                    readingFragment: false,
                }
                for (let line of lines) {
                    // always trim the line
                    line = line.trim();
                    // check if we're inside a fragment
                    if (line.startsWith('}')) {
                        // fragment end, set the status
                        status.readingFragment = false;
                    } else if (status.readingFragment) {
                        // generic element, split the line into a pair of key and value
                        let kv: string[] = line.split("=");
                        for (let i = 0; i < kv.length; i++) {
                            // rewrite these by removing extra characters
                            kv[i] = kv[i].trim();
                            // remove quotations, if present
                            if (kv[i].startsWith("\"") && kv[i].endsWith("\"")) {
                                kv[i] = kv[i].substring(1, kv[i].length - 1);
                            }
                            // remove trailing data that's there for legacy reasons (only in song.year)
                            if (kv[i].startsWith(", ")) {
                                kv[i] = kv[i].substring(2);
                            }
                        }
                        // change where to add it based on the current fragment
                        let el: any;
                        if (status.currentFragment === 'song') {
                            el = {key: kv[0], value: kv[1]}
                        } else {
                            el = {position: kv[0], value: kv[1]}
                        }
                        output[status.currentFragment as ChartFileKey].push(el);
                    } else if (line.startsWith('[')) {
                        // fragment definition, set the name of the fragment in the status
                        let fragmentName = line.substring(1, line.length - 1);
                        // make the first letter lowercase
                        status.currentFragment = fragmentName.charAt(0).toLowerCase() + fragmentName.substring(1);
                    } else if (line.startsWith('{')) {
                        // fragment start, set the status
                        status.readingFragment = true;
                    }
                }
                // resolve the promise here
                resolve(new ChartFile(output));
            };
            // reject the promise on error
            this.reader.onerror = (error) => {
                reject(error);
            };
            // read the file and make the program wait
            this.reader.readAsText(file);
        });
    }

}

export class IniFileReader {

    private reader: FileReader;

    constructor() {
        this.reader = new FileReader();
    }

    public async read(file: File): Promise<IniFile> {
        // make a Promise so the program can wait for readAsText()
        // that damn thing is asynchronous but doesn't return a Promise. sounds good /s
        return new Promise((resolve, reject) => {
            let output: IniFileData = new IniFileData();
            this.reader.onload = (event) => {
                const fileContent: string = this.reader.result as string;
                const lines: string[] = fileContent.split('\n');
                type IniFileKey = keyof typeof output;
                for (let line of lines) {
                    // always trim the line
                    line = line.trim();
                    // check if we're looking at an element
                    if (!line.startsWith('[')) {
                        // generic element, split the line into a pair of key and value
                        let kv: string[] = line.split("=");
                        for (let i = 0; i < kv.length; i++) {
                            kv[i] = kv[i].trim();
                        }
                        // change where to add it based on the current fragment
                        let key = this.toCamelCase(kv[0]);
                        if (key.length > 0) { // check if there's at least a key written
                            output[key as IniFileKey] = kv[1];
                        }
                    }
                }
                // resolve the promise here
                resolve(new IniFile(output));
            }
            // reject the promise on error
            this.reader.onerror = (error) => {
                reject(error);
            }
            // read the file and make the program wait
            this.reader.readAsText(file);
        });
    }

    private toCamelCase(string: string) {
        let splits: string[] = string.split("_");
        for (let i = 1; i < splits.length; i++) {
            splits[i] = splits[i].charAt(0).toUpperCase() + splits[i].substring(1);
        }
        return splits.join("");
    }

}