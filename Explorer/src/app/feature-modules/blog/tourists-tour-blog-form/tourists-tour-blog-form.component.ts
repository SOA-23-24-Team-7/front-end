import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as DOMPurify from 'dompurify';
import { marked } from 'marked';
import { BlogService } from '../blog.service';
import { CreateBlog } from '../model/blog-create.model';
import { UpdateBlog } from '../model/blog-update.model';
import { Blog } from '../model/blog.model';
import { Tour } from '../../tour-authoring/model/tour.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { Equipment } from '../../administration/model/equipment.model';
import { TransportType } from '../../tour-authoring/model/tourDuration.model';

@Component({
  selector: 'xp-tourists-tour-blog-form',
  templateUrl: './tourists-tour-blog-form.component.html',
  styleUrls: ['./tourists-tour-blog-form.component.css']
})
export class TouristsTourBlogFormComponent {
    blog: Blog;
    blogId: number;
    tour: Tour = {
        name: "",
        description: ""
    };
    tourId: number;
    tourInfo: string = "";
    equipment: Equipment[] = [];

    constructor(
        private blogService: BlogService,
        private tourAuthoringService: TourAuthoringService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get("tourId");
        if (Number(param)) {
            this.tourId = Number(param);
            this.tourAuthoringService.getTour(this.tourId).subscribe({
                next: (result: Tour) => {
                    this.tour = result;

                    if(this.tour.id){
                        this.tourAuthoringService.getTourEquipment(this.tour.id).subscribe({
                            next: (result) => {
                                this.equipment = result.results;

                                let equipmentString = "";
                                if(this.equipment){
                                    equipmentString = this.equipment.map(eq => eq.name).join(", ");
                                }

                                let durationString = "";
                                if(this.tour.durations){
                                    durationString = this.tour.durations.map(d => `${this.transportTypeToString(d.transportType)}: ${d.duration} minutes`).join(", ");
                                }

                                let keyPointString = "";
                                if(this.tour.keyPoints){
                                    keyPointString = this.tour.keyPoints.map(kp => kp.name).join(", ");
                                }

                                this.tourInfo = "Distance: " + this.tour.distance?.toString() + "km" + "<br>"
                                  + "Durations: " + durationString + "<br>" 
                                  + "Key Points: " + keyPointString  + "<br>" 
                                  + "Used equipment: " + (equipmentString || "None") || "error";
                            }
                        });
                    }
                },
            });
        }
    }

    blogForm = new FormGroup({
        title: new FormControl(this.tour.name, [Validators.required]),
        description: new FormControl("", [Validators.required]),
    }); 

    getMarkupPreview() {
        const md = marked.setOptions({});
        var description = DOMPurify.sanitize(
            md.parse(this.tourInfo + "<br>" + "Final thoughts: " + this.blogForm.get("description")?.value || ""),
        );
        return description;
    }

    getBlog(): void {
        this.blogService.getBlog(0).subscribe({
            next: (result: Blog) => {
                this.blog = result;
                this.blogForm.patchValue({
                    title: result.title,
                    description: result.description,
                });
            },
        });
    }

    createBlog(): void {
        const blog: CreateBlog = {
            title: this.tour.name || "",
            description: this.tourInfo + "<br>" + "Final thoughts: " + this.blogForm.value.description || "",
            date: new Date().toISOString(),
            status: 0,
            authorId: 0,
        };

        if (blog.title != "" && blog.title != null)
            this.blogService.saveBlog(blog).subscribe({
                next: _ => {
                    this.router.navigate(["/my-blogs"]);
                },
            });
        else
            alert("Must enter title!");
    }

    updateBlog(): void {
        const blog: UpdateBlog = {
            title: this.blogForm.value.title || "",
            description: this.blogForm.value.description || "",
            date: new Date().toISOString(),
            status: 0,
            id: this.blog.id,
            authorId: 0,
        };

        if (blog.title != "" && blog.title != null)
            this.blogService.updateBlog(blog).subscribe({
                next: _ => {
                    this.router.navigate(["/my-blogs"]);
                },
            });
    }

    transportTypeToString(value: TransportType): string {
        switch (value) {
          case TransportType.Car:
            return 'Car';
          case TransportType.Bicycle:
            return 'Bicycle';
          case TransportType.Walking:
            return 'Walking';
          default:
            return '';
        }
      }
      
}
