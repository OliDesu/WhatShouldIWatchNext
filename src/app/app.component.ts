import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import OpenAI from "openai";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
   openai = new OpenAI({ });

movieTitle: String ='';


  title = 'WhatShouldIWatchNext';
  response: String = '';
  async ngOnInit(): Promise<void> {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "system", content: "You are a helpful assistant."},
        {
          role: "user",
          content: "Give me the name of one movie that is similar to"+this.movieTitle+". Respond with only the movie name.",
        },
      ],
    });
    this.response = String(completion.choices[0].message);
    console.log(completion.choices[0].message);
  }
}






