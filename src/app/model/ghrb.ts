export class Track {
    public id!: number;
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
    public id!: number;
    public track!: Track;
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
    public tags?: string[];

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

    public getFormattedTime(): string | undefined {
        if (this.releaseDate === undefined) return undefined;
        let postTime: Date = new Date(this.releaseDate);
        return postTime.toLocaleDateString();
    }

}

export class Variant {
    public charter?: string;
    public gamemode?: string;
    public difficulty?: string;
    public intensity?: number;
    public difficultyCode!: number;

    public tags?: string[];
}