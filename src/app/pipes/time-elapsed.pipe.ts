import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeElapsed'
})
export class TimeElapsedPipe implements PipeTransform {

  transform(time: string | undefined): string {
    if (time === undefined) return "No Time";
    let postTime: number = new Date(time).getTime();
    let currentTime: number = Date.now();
    let relativeDate: Date = new Date(currentTime - postTime);
    let relativeTime: number = relativeDate.getTime() / 1000;
    // check if it's in the future
    if (relativeTime < 0) return "In the future";
    let t = {
        s: Math.floor(relativeTime) % 60,
        min: Math.floor(relativeTime / 60) % 60,
        h: Math.floor(relativeTime / (60 * 60)) % 24,
        d: Math.floor(relativeTime / (60 * 60 * 24)) % 30,
        mon: Math.floor(relativeTime / (60 * 60 * 24 * 30)) % 12,
        y: Math.floor(relativeTime / (60 * 60 * 24 * 30 * 12)),
    }
    if (t.y > 0) {
        return t.y + (t.y === 1 ? " year " : " years ") + "ago";
    } else if (t.mon > 0) {
        return t.mon + (t.mon === 1 ? " month " : " months ") + "ago";
    } else if (t.d > 0) {
        return t.d + (t.d === 1 ? " day " : " days ") + "ago";
    } else if (t.h > 0) {
        return t.h + (t.h === 1 ? " hour " : " hours ") + "ago";
    } else if (t.min > 0) {
        return t.min + (t.min === 1 ? " minute " : " minutes ") + "ago";
    } else if (t.s > 0) {
        return t.s + (t.s === 1 ? " second " : " seconds ") + "ago";
    } else return "Right now";
  }

}
