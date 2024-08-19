import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import OpenAI from "openai";
import { EnvService } from '@ngx-env/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
   openai = new OpenAI({ apiKey: process.env['OPENAI_API_KEY']
     , dangerouslyAllowBrowser: true});

  constructor(private envService: EnvService) {
    this.openai = new OpenAI({ apiKey: this.envService.get('OPENAI_API_KEY') });
  }


  title = 'WhatShouldIWatchNext';
  response: String = '';
  async ngOnInit(): Promise<void> {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "system", content: "You are a helpful assistant."},
        {
          role: "user",
          content: "Write a haiku about recursion in programming.",
        },
      ],
    });
    this.response = String(completion.choices[0].message);
    console.log(completion.choices[0].message);
  }
}






