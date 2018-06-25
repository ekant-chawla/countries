import { Pipe, PipeTransform } from '@angular/core';


//A pipe to help display convert lat long numbers into proper format such as 20° N, 70° W.

@Pipe({ name: 'latLong' })
export class LatLong implements PipeTransform {
    transform(latlng: number[]): string {
        //neglect invalid values of lat long and return ''
        if (latlng.length != 2 || Math.abs(latlng[0]) > 90 || Math.abs(latlng[1]) > 180) return '';

        let lat: string, long: string;

        if (latlng[0] >= 0) {
            lat = `${parseFloat(latlng[0].toFixed(2))}° N`;
        } else {
            lat = `${-parseFloat(latlng[0].toFixed(2))}° S`;
        }

        if (latlng[1] >= 0) {
            long = `${parseFloat(latlng[1].toFixed(2))}° E`;
        } else {
            long = `${-parseFloat(latlng[1].toFixed(2))}° W`;
        }

        return `${lat}, ${long}`;

    }
}