import { Component } from '@angular/core';
import { element } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  arrayList: string;
  Kindex: string;
  numberList: Array<number> = [];
  k: number;
  timeDiff: any;
  minRange: number;
  maxRange: number;
  noEle: number;
  submitted: Boolean = false;
  resNumber: number;
  theoTime: number;
  showCodeStatus: Boolean = false;
  code: any;

  constructor() {
    // initialize model values to ''
    this.arrayList = '';
    this.Kindex = '';
  }

  showHome() {
    window.location.reload();
  }

  showCode() {
    this.showCodeStatus = true;
    this.code = `
    partition(arr, left, right, pivot) {
        let temp = arr[pivot];
        arr[pivot] = arr[right];
        arr[right] = temp;
        let track = left;
        for (let i = left; i < right; i++) {
          if (arr[i] < arr[right]) {
            const t = arr[i];
            arr[i] = arr[track];
            arr[track] = t;
            track++;
          }
        }
        temp = arr[track];
        arr[track] = arr[right];
        arr[right] = temp;
        return track;
      }

    selectIdx(arr, left, right, k) {
        if (left === right) {
          return arr[left];
        }
      const dest = left + k;
      while (true) {
        let pivotIndex = right - left + 1 <= 5 ?
        Math.floor(Math.random() * (right - left + 1)) + left : this.medianOfMedians(arr, left, right);
        pivotIndex = this.partition(arr, left, right, pivotIndex);
        if (pivotIndex === dest) {
          return pivotIndex;
        } else if (pivotIndex < dest) {
          left = pivotIndex + 1;
        } else {
          right = pivotIndex - 1;
        }
      }
    }

    medianOfMedians(arr, left, right) {
      const numMedians = Math.ceil((right - left) / 5);
      for (let i = 0; i < numMedians; i++) {
        const subLeft = left + i * 5;
        let subRight = subLeft + 4;
        if (subRight > right) {
          subRight = right;
        }
        const medianIdx = this.selectIdx(arr, subLeft, subRight, Math.floor((subRight - subLeft) / 2));
        const temp = arr[medianIdx];
        arr[medianIdx] = arr[left + i];
        arr[left + i] = temp;
      }
      return this.selectIdx(arr, left, left + numMedians - 1, Math.floor(numMedians / 2));
    }

    selectK(arr, k) {
      if (!Array.isArray(arr) || arr.length === 0 || arr.length - 1 < k) {
        return;
      }
      const idx = this.selectIdx(arr, 0, arr.length - 1, k);
      return arr[idx];
    }`;
  }

  sortData() {
    this.submitted = true;
    const temp = this.arrayList.split(',');
    temp.forEach(ele => {
      if (ele) {
        this.numberList.push(parseInt(ele, 10));
      }
    });
    this.k = parseInt(this.Kindex, 10);
    this.k = this.k - 1;

    for (let i = 0; i < this.noEle; i ++) {
      this.numberList.push(Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange);
    }

    const startTime = new Date().getTime();
    this.resNumber = this.selectK(this.numberList, this.k);
    const endTime = new Date().getTime();
    this.timeDiff = endTime - startTime; // in ms
  }

  partition(arr, left, right, pivot) {
    let temp = arr[pivot];
    arr[pivot] = arr[right];
    arr[right] = temp;
    let track = left;
    for (let i = left; i < right; i++) {
      if (arr[i] < arr[right]) {
        const t = arr[i];
        arr[i] = arr[track];
        arr[track] = t;
        track++;
      }
    }
    temp = arr[track];
    arr[track] = arr[right];
    arr[right] = temp;
    return track;
  }

  selectIdx(arr, left, right, k) {
    if (left === right) {
      return arr[left];
    }
    const dest = left + k;
    while (true) {
      let pivotIndex = right - left + 1 <= 5 ?
      Math.floor(Math.random() * (right - left + 1)) + left : this.medianOfMedians(arr, left, right);
      pivotIndex = this.partition(arr, left, right, pivotIndex);
      if (pivotIndex === dest) {
        return pivotIndex;
      } else if (pivotIndex < dest) {
        left = pivotIndex + 1;
      } else {
        right = pivotIndex - 1;
      }
    }
  }

  medianOfMedians(arr, left, right) {
    const numMedians = Math.ceil((right - left) / 5);
    for (let i = 0; i < numMedians; i++) {
      const subLeft = left + i * 5;
      let subRight = subLeft + 4;
      if (subRight > right) {
        subRight = right;
      }
      const medianIdx = this.selectIdx(arr, subLeft, subRight, Math.floor((subRight - subLeft) / 2));
      const temp = arr[medianIdx];
      arr[medianIdx] = arr[left + i];
      arr[left + i] = temp;
    }
    return this.selectIdx(arr, left, left + numMedians - 1, Math.floor(numMedians / 2));

  }

  selectK(arr, k) {
    if (!Array.isArray(arr) || arr.length === 0 || arr.length - 1 < k) {
      return;
    }
    const idx = this.selectIdx(arr, 0, arr.length - 1, k);
    return arr[idx];
  }
}
