import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FoodserviceService } from '../foodservice.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    DatePickerModule,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService],
})
export class HomeComponent implements OnInit{
  #foodService = inject(FoodserviceService);
  public timeSlots = [
    { label: '6:00 PM', value: '18:00' },
    { label: '7:00 PM', value: '19:00' },
    { label: '8:00 PM', value: '20:00' },
    { label: '9:00 PM', value: '21:00' },
  ];
  public reservationForm!: FormGroup;
  public date1: Date | undefined;
  public minDate: Date = new Date();
  public visible = signal<boolean>(false);

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.reservationForm = new FormGroup({
      date: new FormControl<Date | null>(null, [Validators.required]),
      time: new FormControl<string | null>(null, [Validators.required]),
      guest: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(1),
      ]),
      phone: new FormControl<number | null>(null, [
        Validators.required,
        Validators.pattern('^[0-9]{9,11}$'),
      ]),
    });
  }

  dialogEff = effect(() => {
    if (this.#foodService.dialogVisible() == true) this.visible.set(true);
  });

  /**Trigger when the dialog close */
  onDialogClose() {
    this.#foodService.dialogVisible.set(false);
  }

  /**Success Message when click on confrim reservation button */
  confirmReservation() {
    this.messageService.add({
      severity: 'success',
      summary: 'Reservation Success',
      detail: 'Confrim successfully',
    });
    this.reservationForm.reset();
  }
}
