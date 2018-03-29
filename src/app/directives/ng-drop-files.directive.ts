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
    this._preventOpenFile(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transfer = this._getTranference(event);

    if (!transfer) {
      return;
    }

    this._extractFiles(transfer.files);
    this._preventOpenFile(event);

    this.mouseOver.emit(false);
  }

  // This becuase each browser understands in a different way drag and drop event.
  private _getTranference(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList) {

    // console.log(fileList);
    // Method to convert an object to Array.
    // tslint:disable-next-line:forin
    for (const property in Object.getOwnPropertyNames(fileList) {

      const temporalFile = fileList[property];

      if (this._fileCanBeUploaded(temporalFile)) {

        const newFile = new FileItem(temporalFile);
        this.files.push(newFile);
      }
    }
    console.log(this.files);
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
