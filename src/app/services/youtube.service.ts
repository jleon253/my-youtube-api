import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {YoutubeResponse} from '../models/youtube.models';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private urlYoutubeAPI = 'https://www.googleapis.com/youtube/v3';
  private keyAPI = 'AIzaSyA7WmNNXqgVBNZDyspDjK4dZrRZyCKL9xc';
  private playListId = 'UUuaPTYj15JSkETGnEseaFFg'; // Fernando Herrera Channel - PlayList: Upload videos
  private nextPageToken = '';
  private maxResults = 9;

  constructor(private http: HttpClient) {}

  uploadedVideos() {
    // tslint:disable-next-line: max-line-length
    // URL goal: https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyA7WmNNXqgVBNZDyspDjK4dZrRZyCKL9xc&playlistId=UUuaPTYj15JSkETGnEseaFFg&maxResults=10
    const url = `${this.urlYoutubeAPI}/playlistItems`;
    const customParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.keyAPI)
      .set('playlistId', this.playListId)
      .set('maxResults', `${this.maxResults}`)
      .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(url, {params: customParams}).pipe(
      // De la respuesta, filtro/extraigo el array de videos, pero con información general
      map(resp => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),
      // Del array de videos, creo un nuevo array filtrado con información más precisa del video
      map(items => items.map(video => video.snippet))
    );
  }
}
