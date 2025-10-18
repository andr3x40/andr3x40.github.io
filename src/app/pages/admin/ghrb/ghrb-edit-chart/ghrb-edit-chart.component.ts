import { Component } from '@angular/core';
import { AuthService, UserDetails } from '../../../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { GhrbService } from '../../../../services/ghrb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartFile, ChartFileData, ChartFileReader, IniFile, IniFileData, IniFileReader, Track, Variant } from '../../../../model/ghrb';
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
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { FormService } from '../../../../services/form.service';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { BadgeModule } from "primeng/badge";
import { PrimeNG } from 'primeng/config';
import { ValidationError } from '../../../../model/validation';

@Component({
  selector: 'app-ghrb-edit-chart',
  imports: [ReactiveFormsModule, DividerModule, ButtonModule, StepperModule, ButtonGroupModule, FloatLabelModule, InputText, InputNumber,
    InputGroupModule, InputGroupAddonModule, TextareaModule, CheckboxModule, TableModule, Toast, ToastModule, FileUpload, BadgeModule],
  providers: [MessageService],
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

  public chartFile!: File | undefined;
  public iniFile!: File | undefined;

  private buildTrackForm(
    id: number | null,
    title: string | null,
    artist: string | null,
    album: string | null,
    albumLink: string | null,
    year: string | null,
    genre: string | null,
    length: number | null,
    minimumBpm: number | null,
    maximumBpm: number | null
  ) {
    this.trackForm = this.formBuilder.group({
      id: new FormControl(id, Validators.required),
      title: new FormControl(title, [Validators.required]),
      artist: new FormControl(artist, [Validators.required]),
      album: new FormControl(album, Validators.required),
      albumLink: new FormControl(albumLink),
      year: new FormControl(year, Validators.required),
      genre: new FormControl(genre, Validators.required),
      length: new FormControl(length, Validators.required),
      minimumBpm: new FormControl(minimumBpm, Validators.required),
      maximumBpm: new FormControl(maximumBpm, Validators.required),
    });
  }

  private buildChartForm(
    id: number,
    downloadLink: string | null,
    source: string | null,
    description: string | null,
    youtubeLink: string | null,
    spotifyLink: string | null,
    soundcloudLink: string | null,
    bandcampLink: string | null,
    pub: boolean,
    tags: string | null
  ) {
    this.chartForm = this.formBuilder.group({
      id: new FormControl(id, Validators.required),
      downloadLink: new FormControl(downloadLink),
      source: new FormControl(source),
      description: new FormControl(description),
      youtubeLink: new FormControl(youtubeLink),
      spotifyLink: new FormControl(spotifyLink),
      soundcloudLink: new FormControl(soundcloudLink),
      bandcampLink: new FormControl(bandcampLink),
      public: new FormControl(pub, Validators.required),
      tags: new FormControl(tags)
    });
  }

  public addVariantForm(
    id: number,
    charter: string | null,
    gamemode: string | null,
    difficulty: string | null,
    intensity: number | null,
    difficultyCode: number | null,
    tags: string | null
  ) {
    this.variantForms.push(this.formBuilder.group({
      id: new FormControl(id, Validators.required),
      charter: new FormControl(charter),
      gamemode: new FormControl(gamemode, Validators.required),
      difficulty: new FormControl(difficulty, Validators.required),
      intensity: new FormControl(intensity, Validators.required),
      difficultyCode: new FormControl(difficultyCode, Validators.required),
      tags: new FormControl(tags)
    }));
  }

  public addNewVariantForm() {
    this.addVariantForm(0, null, null, null, 0, 0, null);
  }
  
  public removeLastVariantForm() {
    this.variantForms.pop();
  }

  constructor(private formBuilder: FormBuilder, public auth: AuthService, public ghrb: GhrbService,
      public router: Router, public route: ActivatedRoute, public messageService: MessageService, public formService: FormService,
      public config: PrimeNG) {
    this.buildTrackForm(0, null, null, null, null, null, null, 0, 0, 0);
    this.buildChartForm(0, null, null, null, null, null, null, null, false, null);
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
        if (track !== undefined) {
          this.buildTrackForm(
            track.id ?? 0,
            track.title ?? null,
            track.artist ?? null,
            track.album ?? null,
            track.albumLink ?? null,
            track.year ?? null,
            track.genre ?? null,
            track.length ?? 0,
            track.minimumBpm ?? 0,
            track.maximumBpm ?? 0
          );
        }
        for (let variant of chart.variants) {
          this.addVariantForm(
            variant.id ?? 0,
            variant.charter ?? null,
            variant.gamemode ?? null,
            variant.difficulty ?? null,
            variant.intensity ?? 0,
            variant.difficultyCode ?? 0,
            variant.tags ?? null
          );
        }
        this.buildChartForm(
          chart.id ?? 0,
          chart.downloadLink ?? null,
          chart.source ?? null,
          chart.description ?? null,
          chart.youtubeLink ?? null,
          chart.spotifyLink ?? null,
          chart.soundcloudLink ?? null,
          chart.bandcampLink ?? null,
          chart.public ?? false,
          chart.tags ?? null
        );
      }
    }
  }

  public async confirmChart() {
    // before, check the validity of the forms
    let valid: boolean = this.checkFormsValidity([this.trackForm, this.trackForm, ...this.variantForms]);
    // if it's not valid, show an error message
    if (!valid) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Input', detail: 'Make sure to fill all mandatory fields.', key: 'bottom', life: 3000 });
      return;
    }
    // create the chart from the form
    let chart: Chart = this.createChart(this.chartForm);
    // add the track
    chart.track = this.createTrack(this.trackForm);
    // add all the variants
    for (let variantForm of this.variantForms) {
      chart.variants.push(this.createVariant(variantForm));
    }
    // and save it
    let errors: ValidationError[] | null = await this.ghrb.saveChart(chart);
    if (errors !== null) {
      if (errors.length == 0) {
        this.router.navigate(['/projects/ghrb/charts']);
      } else {
        // send error messages
        for (let error of errors) {
          this.messageService.add({
            severity: 'error',
            summary: `Invalid Input (${error.rejectedValue})`,
            detail: error.code,
            key: 'bottom',
            life: 3000
          });
        }
      }
    }
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

  /**
   * Checks the validity of a field in a form.
   * @param form the form to check in
   * @param field the field of the given form to check
   * @returns `false` if it's invalid, `true` in all other cases
   */
  public checkFieldValidity(form: FormGroup, field: string) : boolean {
    return this.formService.checkFieldValidity(form, field);
  }

  /**
   * Checks if a field in a form is disabled.
   * @param form the form to check in
   * @param field the field of the given form to check
   * @returns `true` if it's disabled, `false` otherwise
   */
  public checkFieldDisable(form: FormGroup, field: string) : boolean {
    return this.formService.checkFieldDisable(form, field);
  }

  /**
   * Checks the validity of a group of forms
   * @param forms the forms to check
   * @returns `true` if all given forms are valid, `false` if at least one control in these forms is invalid
   */
  private checkFormsValidity(forms: FormGroup<any>[]): boolean {
    return this.formService.checkFormsValidity(forms);
  }

  public onSelect(event: FileSelectEvent) {
    let files: File[] = event.currentFiles;
    this.chartFile = files.find(f => f.name.endsWith('.chart'));
    this.iniFile = files.find(f => f.name.endsWith('.ini'));
  }

  public choose(event: MouseEvent, callback: any) {
    callback();
  }

  public removeFile(event: MouseEvent, file: any, removeFileCallback: any, index: any) {
    removeFileCallback(event, index);
  }

  public formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (sizes === undefined) return '';
    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  public async readFiles() {
    // read the chart file
    if (this.chartFile !== undefined) {
      let reader: ChartFileReader = new ChartFileReader();
      let file: ChartFile = await reader.read(this.chartFile);
      let data: ChartFileData = file.data;
      
      this.trackForm.controls['title'].setValue(data.song.find(x => x.key === 'Name')?.value);
      this.trackForm.controls['artist'].setValue(data.song.find(x => x.key === 'Artist')?.value);
      this.trackForm.controls['album'].setValue(data.song.find(x => x.key === 'Album')?.value);
      this.trackForm.controls['year'].setValue(data.song.find(x => x.key === 'Year')?.value);
      this.trackForm.controls['genre'].setValue(data.song.find(x => x.key === 'Genre')?.value);

      // read minimum and maximum BPM
      let minimumBpm: number | undefined = undefined;
      let maximumBpm: number | undefined = undefined;
      for (let tempo of data.syncTrack.filter(x => x.value.startsWith("B"))) {
        if (tempo.position === '0') continue; // skip the first one 
        let values: string[] = tempo.value.split(" ");
        let bpm: number = parseInt(values[1]) / 1000;
        if (minimumBpm === undefined || bpm < minimumBpm) minimumBpm = bpm;
        if (maximumBpm === undefined || bpm > maximumBpm) maximumBpm = bpm;
      }

      this.trackForm.controls['minimumBpm'].setValue(minimumBpm);
      this.trackForm.controls['maximumBpm'].setValue(maximumBpm);

      let charter: string | undefined = data.song.find(x => x.key === 'Charter')?.value;
      let intensity: string | undefined = data.song.find(x => x.key === 'Difficulty')?.value;

      for (let variant of file.variants) {
        let difficultyCode: number = 0;
        switch (variant.difficulty) {
          case 'Easy': difficultyCode = 1; break;
          case 'Medium': difficultyCode = 2; break;
          case 'Hard': difficultyCode = 3; break;
          case 'Expert': difficultyCode = 4; break;
          default: break;
        }
        if (variant.difficulty === 'Easy') difficultyCode = 1;
        this.addVariantForm(
          0,
          charter ?? null,
          variant.gamemode,
          variant.difficulty,
          intensity !== undefined ? parseInt(intensity) : null,
          difficultyCode,
          null
        );
      }
    }
    // read the info file
    if (this.iniFile !== undefined) {
      let reader: IniFileReader = new IniFileReader();
      let readFile: IniFile = await reader.read(this.iniFile);
      let data: IniFileData = readFile.data;
      // this file has priority over the chart file
      this.trackForm.controls['title'].setValue(data.name);
      this.trackForm.controls['artist'].setValue(data.artist);
      this.trackForm.controls['album'].setValue(data.album);
      this.trackForm.controls['year'].setValue(data.year);
      this.trackForm.controls['genre'].setValue(data.genre);
      this.trackForm.controls['length'].setValue(Math.floor(parseInt(data.songLength) / 1000));
      
      this.chartForm.controls['source'].setValue(data.icon);
      this.chartForm.controls['description'].setValue(data.loadingPhrase);

      for (let variantForm of this.variantForms) {
        switch (variantForm.controls['gamemode'].value) {
          case '5 Fret Lead Guitar': variantForm.controls['intensity'].setValue(data.diffGuitar); break;
          case '5 Fret Bass Guitar': variantForm.controls['intensity'].setValue(data.diffBass); break;
          case '5 Fret Co-op Guitar': variantForm.controls['intensity'].setValue(data.diffGuitarCoop); break;
          case '5 Fret Rhythm Guitar': variantForm.controls['intensity'].setValue(data.diffRhythm); break;
          case '6 Fret Lead Guitar': variantForm.controls['intensity'].setValue(data.diffGuitarGhl); break;
          case '6 Fret Bass Guitar': variantForm.controls['intensity'].setValue(data.diffBassGhl); break;
          case '6 Fret Co-op Guitar': variantForm.controls['intensity'].setValue(data.diffGuitarCoopGhl); break;
          case '6 Fret Rhythm Guitar': variantForm.controls['intensity'].setValue(data.diffRhythmGhl); break;
          case 'Drums': variantForm.controls['intensity'].setValue(data.diffDrums); break;
          case 'Keyboard': variantForm.controls['intensity'].setValue(data.diffKeys); break;
        }
      }
    }
  }
  
}
