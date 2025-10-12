import { Component } from '@angular/core';
import { AuthService, UserDetails } from '../../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { GhrbService } from '../../../../services/ghrb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, Track, Variant } from '../../../../model/ghrb';
import { StepperModule } from 'primeng/stepper';
import { ButtonGroupModule } from "primeng/buttongroup";
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputText } from "primeng/inputtext";
import { InputNumber } from "primeng/inputnumber";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ghrb-edit-chart',
  imports: [ReactiveFormsModule, DividerModule, ButtonModule, StepperModule, ButtonGroupModule, FloatLabelModule, InputText, InputNumber
    ,InputGroupModule, InputGroupAddonModule, TextareaModule, CheckboxModule, TableModule
  ],
  templateUrl: './ghrb-edit-chart.component.html',
  styleUrl: './ghrb-edit-chart.component.scss'
})
export class GhrbEditChartComponent {

  public id!: number;
  public user!: UserDetails | null;
  public trackForm!: FormGroup;
  public chartForm!: FormGroup;
  public variantForms: FormGroup[] = [];
  public albumCoverPreview: string | undefined = undefined;

  private buildTrackForm(id: number, title: string, artist: string, album: string, albumLink: string,
    year: string, genre: string, length: number, minimumBpm: number, maximumBpm: number
  ) {
    this.trackForm = this.formBuilder.group({
      id: [id, Validators.required],
      title: [title, Validators.required],
      artist: [artist, Validators.required],
      album: [album, Validators.required],
      albumLink: [albumLink, Validators.required],
      year: [year, Validators.required],
      genre: [genre, Validators.required],
      length: [length, Validators.required],
      minimumBpm: [minimumBpm, Validators.required],
      maximumBpm: [maximumBpm, Validators.required]
    })
  }

  private buildChartForm(id: number, downloadLink: string, source: string, description: string, youtubeLink: string, spotifyLink: string, soundcloudLink: string, bandcampLink: string, pub: boolean, tags: string) {
    this.chartForm = this.formBuilder.group({
      id: [id, Validators.required],
      downloadLink: [downloadLink, Validators.required],
      source: [source, Validators.required],
      description: [description, Validators.required],
      youtubeLink: [youtubeLink],
      spotifyLink: [spotifyLink],
      soundcloudLink: [soundcloudLink],
      bandcampLink: [bandcampLink],
      public: [pub, Validators.required],
      tags: [tags, Validators.required]
    })
  }

  public addVariantForm(id: number, charter: string, gamemode: string, difficulty: string, intensity: number, difficultyCode: number, tags: string) {
    this.variantForms.push(this.formBuilder.group({
      id: [id, Validators.required],
      charter: [charter, Validators.required],
      gamemode: [gamemode, Validators.required],
      difficulty: [difficulty, Validators.required],
      intensity: [intensity, Validators.required],
      difficultyCode: [difficultyCode, Validators.required],
      tags: [tags]
    }));
  }

  public addNewVariantForm() {
    this.addVariantForm(0, '', '', '', 0, 0, '');
  }
  
  public removeLastVariantForm() {
    this.variantForms.pop();
  }

  constructor(private formBuilder: FormBuilder, public auth: AuthService, public ghrb: GhrbService, public router: Router, public route: ActivatedRoute) {
    this.buildTrackForm(0, '', '', '', '', '', '', 0, 0, 0);
    this.buildChartForm(0, '', '', '', '', '', '', '', false, '');
  }

  async ngOnInit() {
    this.user = await this.auth.getUserDetails();
    // get the ID, if there is one
    this.route.params.subscribe(p => this.id = parseInt(p['id']));
    // load the selected post if an ID was provided
    if (!Number.isNaN(this.id)) {
      let chart: Chart | null = await this.ghrb.getChart(this.id);
      if (chart !== null) {
        let track: Track | undefined = chart.track;
        let variants: Variant[] = chart.variants;
        if (track !== undefined) {
          this.buildTrackForm(
            track.id ?? 0,
            track.title ?? '',
            track.artist ?? '',
            track.album ?? '',
            track.albumLink ?? '',
            track.year ?? '',
            track.genre ?? '',
            track.length ?? 0,
            track.minimumBpm ?? 0,
            track.maximumBpm ?? 0
          );
        }
        for (let variant of variants) {
          this.addVariantForm(
            variant.id ?? 0,
            variant.charter ?? '',
            variant.gamemode ?? '',
            variant.difficulty ?? '',
            variant.intensity ?? 0,
            variant.difficultyCode ?? 0,
            variant.tags ?? ''
          );
        }
        this.buildChartForm(
          chart.id ?? 0,
          chart.downloadLink ?? '',
          chart.source ?? '',
          chart.description ?? '',
          chart.youtubeLink ?? '',
          chart.spotifyLink ?? '',
          chart.soundcloudLink ?? '',
          chart.bandcampLink ?? '',
          chart.public ?? false,
          chart.tags ?? ''
        );
      }
    }
  }

  public async confirmChart() {
    // create the chart from the form
    let chart: Chart = this.createChart(this.chartForm);
    // add the track
    chart.track = this.createTrack(this.trackForm);
    // add all the variants
    for (let variantForm of this.variantForms) {
      chart.variants.push(this.createVariant(variantForm));
    }
    // and save it
    console.log(chart);
    await this.ghrb.saveChart(chart);
    this.router.navigate(['/projects/ghrb/charts']);
  }

  public confirmCancel() {
    this.router.navigate(['/projects/ghrb/charts']);
  }

  private createTrack(form: FormGroup): Track {
    let track: Track = new Track();
    track.id = form.get('id')?.value;
    // if the ID is 0, set to undefined, just in case
    if (track.id === 0) track.id = undefined;
    track.title = form.get('title')?.value;
    track.artist = form.get('artist')?.value;
    track.album = form.get('album')?.value;
    track.albumLink = form.get('albumLink')?.value;
    track.year = form.get('year')?.value;
    track.genre = form.get('genre')?.value;
    track.length = form.get('length')?.value;
    track.minimumBpm = form.get('minimumBpm')?.value;
    track.maximumBpm = form.get('maximumBpm')?.value;
    return track;
  }

  private createChart(form: FormGroup): Chart {
    let chart: Chart = new Chart();
    chart.id = form.get('id')?.value;
    // if the ID is 0, set to undefined, just in case
    if (chart.id === 0) chart.id = undefined;
    chart.track = undefined;
    chart.variants = [];
    // generate the release date
    chart.releaseDate = new Date(Date.now()).toISOString();
    chart.downloadLink = form.get('downloadLink')?.value;
    chart.source = form.get('source')?.value;
    chart.description = form.get('description')?.value;
    chart.youtubeLink = form.get('youtubeLink')?.value;
    chart.spotifyLink = form.get('spotifyLink')?.value;
    chart.soundcloudLink = form.get('soundcloudLink')?.value;
    chart.bandcampLink = form.get('bandcampLink')?.value;
    chart.public = form.get('public')?.value;
    chart.tags = form.get('tags')?.value;
    return chart;
  }

  private createVariant(form: FormGroup): Variant {
    let variant: Variant = new Variant();
    variant.id = form.get('id')?.value;
    // if the ID is 0, set to undefined, just in case
    if (variant.id === 0) variant.id = undefined;
    variant.charter = form.get('charter')?.value;
    variant.gamemode = form.get('gamemode')?.value;
    variant.difficulty = form.get('difficulty')?.value;
    variant.intensity = form.get('intensity')?.value;
    variant.difficultyCode = form.get('difficultyCode')?.value;
    variant.tags = form.get('tags')?.value;
    return variant;
  }

  public reloadAlbumCoverImage() {
    this.albumCoverPreview = this.trackForm.get('albumLink')?.value;
  }

}
