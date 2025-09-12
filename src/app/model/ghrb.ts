export class Chart {
    public id!: number;
    public title?: string;
    public artist?: string;
    public album?: string;
    public year?: string;
    public genre?: string;
    public variants?: Variant[];
    public releaseDate?: string;
    public downloadLink!: string;
    public image?: string;
    public source?: string;
}

export class Variant {
    public charter?: string;
    public gamemode?: string;
    public difficulty?: string;
    public intensity?: number;
}