import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import {Video} from '../../models/youtube.models';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  constructor( private yotubeService: YoutubeService) { }

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.yotubeService.uploadedVideos().subscribe(resp => {
      // Operador spread para que no sobreescriba los elementos sino que añada los nuevos
      this.videos.push(...resp);
      console.log('Los videos', this.videos);
    });
  }

  showVideoModal(video: Video) {
    console.log(video);
    Swal.fire({
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
      showCloseButton: true,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#DC3545',
      title: `<h3>${video.title}</h3>`,
      html: `
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/${video.resourceId.videoId}"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            encrypted-media;
            gyroscope;
            picture-in-picture
          "
          allowfullscreen
        ></iframe>
      `
    });
  }

}
