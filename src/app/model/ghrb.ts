export class Chart {
    public id!: number;
    public title?: string;
    public artist?: string;
    public album?: string;
    public year?: string;
    public genre?: string;
    public variants!: Variant[];
    public releaseDate?: string;
    public downloadLink?: string;
    public image?: string;
    public source?: string;
    public description?: string;

    public youtubeLink?: string;
    public spotifyLink?: string;
    public soundcloudLink?: string;
    public bandcampLink?: string;

    public static cloneWithoutVariants(chart: Chart): Chart {
        let output: Chart = new Chart();

        output.id = chart.id;
        output.title = chart.title;
        output.artist = chart.artist;
        output.album = chart.album;
        output.year = chart.year;
        output.genre = chart.genre;
        output.releaseDate = chart.releaseDate;
        output.downloadLink = chart.downloadLink;
        output.image = chart.image;
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
    public charter?: string;
    public gamemode?: string;
    public difficulty?: string;
    public intensity?: number;
    public difficultyCode!: number;
}