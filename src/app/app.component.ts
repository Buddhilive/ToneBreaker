import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import * as Tone from "tone";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  notes = [
    { time: "0:0:0", note: "C4", duration: "8n" },
    { time: "0:0:2", note: "E4", duration: "8n" },
    { time: "0:1:0", note: "G4", duration: "8n" },
    { time: "0:1:2", note: "B4", duration: "8n" },
    { time: "0:2:0", note: "C5", duration: "8n" },
    { time: "0:3:0", note: "B4", duration: "8n" },
    { time: "0:3:2", note: "G4", duration: "8n" },
    { time: "1:0:0", note: "E4", duration: "8n" },
    { time: "1:0:2", note: "C4", duration: "8n" }
  ];

  runTone() {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    //play a middle 'C' for the duration of an 8th note
    // synth.triggerAttackRelease("C4", "8n");

    // Create a part that will play the sequence
    const part = new Tone.Part((time, value) => {
      synth.triggerAttackRelease(value.note, value.duration, time);
    }, this.notes).start(0);

    // Set the BPM (beats per minute)
    //Tone.Transport.bpm.value = 120;

    // Start the transport to hear the sequence
    //Tone.Transport.start();
  }
}
