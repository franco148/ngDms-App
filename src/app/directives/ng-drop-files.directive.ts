// EventEmitter to heard events from the parent.
// ElementReft to have a direct interaction with the html
// HostListener Events or callbacks when something happens (drag, mouse over, etc).
// Output a response for EventEmitter
import { Directive, EventEmitter, ElementRef, HostListener, Output, Input } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }

  // Validations

  private _fileCanBeUploaded(file: File): boolean {

    if (!this._fileHasBeenDropped(file.name) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _preventOpenFile(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileHasBeenDropped(fileName: string): boolean {

    for (const file of this.files) {

      if (file.fileName === fileName) {
        console.log('The file ' + fileName + ' is already added...');

        return true;
      }
    }

    return false;
  }

  private _isImage(fileType: string): boolean {
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }
}
