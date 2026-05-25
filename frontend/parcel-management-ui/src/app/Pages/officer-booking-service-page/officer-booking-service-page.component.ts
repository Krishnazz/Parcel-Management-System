import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../../Components/admin-header/admin-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfficerBookingServiceService } from '../services/officer-booking-service.service';

@Component({
  selector: 'app-officer-booking-service-page',
  standalone: true,
  imports: [AdminHeaderComponent,ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './officer-booking-service-page.component.html',
  styleUrl: './officer-booking-service-page.component.css'
})
export class OfficerBookingServicePageComponent {
  obj:any = JSON.parse(sessionStorage.getItem('user')!);
  userId:string = this.obj.userId;

  constructor(private bookingService: OfficerBookingServiceService) {}
  
    getParcelWeightValue(weightString: string): number {
      switch (weightString) {
        case '<500g': return 0.5;
        case '500g-1kg': return 1.0;
        case '>1kg': return 2.0; // or any default value for >1kg
        default: return 0;
      }
    }
    invoice: any = null;
  
  submitBooking() {
    const userId = this.userId; // get this from your app logic
    const parcel = {
      receiverName: this.receiverInfo.name,
      receiverAddress: this.receiverInfo.address,
      receiverPin: this.receiverInfo.pin,
      receiverMobile: this.receiverInfo.contact,
      parcelWeight: this.getParcelWeightValue(this.parcelDetails.weight),
      parcelContent: this.parcelDetails.contentDescription,
      deliveryType: this.parcelDetails.deliverySpeed,
      parPackingPreference: this.parcelDetails.packaging,
      parPickupDate: this.parcelDetails.pickupDate,
      parDropoffDate: this.parcelDetails.dropDate,
      parPickupTime: this.parcelDetails.pickupTime,
      parDropupTime: this.parcelDetails.dropTime,
      serviceCost: this.totalCost,
      paymentTime: new Date().toISOString(),
      parcelStatus: 'Booked'
    };
  
    this.bookingService.bookParcel(userId, parcel).subscribe({
      next: (bookingId) => {
        this.bookingId = bookingId;
        this.currentStep = 5;
        // Fetch invoice
        this.bookingService.getInvoice(bookingId, userId).subscribe({
          next: (invoice) => {
            this.invoice = invoice;
          },
          error: () => {
            this.invoice = null;
          }
        });
      },
      error: (err) => {
        alert('Booking failed: ' + (err.error?.message || 'Server error'));
      }
    });
  }

  currentStep: number = 1;
  showErrors: boolean = false;
  bookingId: number | null = null;

  receiverInfo = {
    name: '',
    address: '',
    pin: '',
    contact: '',
    countryCode: '+91'
  };
  parcelDetails = {
    size: 'small',
    weight: '<500g',
    contentDescription: '',
    deliverySpeed: 'standard',
    packaging: 'Standard',
    pickupDate: '',
    dropDate: '',
    pickupTime: '',
    dropTime: ''
  };

  payment = {
    mode: 'Debit Card',
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  };

  errors: any = {
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  };

  totalCost: number = 100; // Base cost for standard delivery

  get isReceiverPinInvalid(): boolean {
    return !this.receiverInfo.pin || !/^\d{6}$/.test(this.receiverInfo.pin);
  }
  get isReceiverContactInvalid(): boolean {
    return !this.receiverInfo.contact || !/^\d{10}$/.test(this.receiverInfo.contact);
  }

  dateTimeErrors = {
    pickupPast: false,
    dropBeforePickup: false
  };

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  nextStep(step?: number) {
    if (step === undefined) step = this.currentStep + 1;

    // Step 3: Payment mode selection
    if (this.currentStep === 3) {
      if (this.payment.mode === 'Debit Card' || this.payment.mode === 'Credit Card') {
        this.currentStep = 4;
        return;
      } else {
        this.currentStep = 5;
        return;
      }
    }

    // Step 4: Card details validation
    if (this.currentStep === 4) {
      if (this.validateCardDetails()) {
        this.submitBooking();
        return;
      } else {
        // Show errors, stay on step 4
        this.showErrors = true;
        return;
      }
    }

    // For steps 1 and 2, use validation
    if (this.validateStep(this.currentStep)) {
      this.showErrors = false;
      if (step >= 1 && step <= 5) {
        this.currentStep = step;
        if (step === 3) {
          this.calculateTotalCost();
        }
      }
    } else {
      this.showErrors = true;
    }
  }

  prevStep(step?: number) {
    if (step !== undefined) {
      this.currentStep = step;
    } else {
      this.currentStep = this.currentStep - 1;
    }
    this.showErrors = false;
  }

  validateStep(step: number): boolean {
    let isValid = true;
    this.dateTimeErrors.pickupPast = false;
    this.dateTimeErrors.dropBeforePickup = false;

    if (step === 1) {
      if (!this.receiverInfo.name) isValid = false;
      if (!this.receiverInfo.address) isValid = false;
      if (!this.receiverInfo.pin || !/^\d{6}$/.test(this.receiverInfo.pin)) isValid = false;
      if (!this.receiverInfo.contact || !/^\d{10}$/.test(this.receiverInfo.contact)) isValid = false;
    }
    if (step === 2) {
      if (!this.parcelDetails.size) isValid = false;
      if (!this.parcelDetails.weight) isValid = false;
      if (!this.parcelDetails.contentDescription) isValid = false;
      if (!this.parcelDetails.pickupDate || !this.parcelDetails.dropDate) isValid = false;
      if (!this.parcelDetails.pickupTime || !this.parcelDetails.dropTime) isValid = false;

      // Date/time validation
      const now = new Date();
      const pickupDateTime = new Date(`${this.parcelDetails.pickupDate}T${this.parcelDetails.pickupTime}`);
      const dropDateTime = new Date(`${this.parcelDetails.dropDate}T${this.parcelDetails.dropTime}`);

      if (pickupDateTime < now) {
        this.dateTimeErrors.pickupPast = true;
        isValid = false;
      }
      if (dropDateTime <= pickupDateTime) {
        this.dateTimeErrors.dropBeforePickup = true;
        isValid = false;
      }
    }
    return isValid;
  }

  validateCardDetails(): boolean {
    let valid = true;
    this.errors = {
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      cvv: ''
    };

    if (!/^\d{16}$/.test(this.payment.cardNumber)) {
      this.errors.cardNumber = 'Card number must be 16 digits.';
      valid = false;
    }
    if (!/^[a-zA-Z\s]+$/.test(this.payment.cardHolder)) {
      this.errors.cardHolder = 'Card holder name is required.';
      valid = false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.payment.expiry)) {
      this.errors.expiry = 'Expiry must be in MM/YY format.';
      valid = false;
    }
    if (!/^\d{3}$/.test(this.payment.cvv)) {
      this.errors.cvv = 'CVV must be 3 digits.';
      valid = false;
    }
    return valid;
  }

  calculateTotalCost() {
    let cost = 100;
    if (this.parcelDetails.deliverySpeed === 'express') {
      cost += 50;
    }
    switch (this.parcelDetails.packaging) {
      case 'Standard':
        cost += 10;
        break;
      case 'Custom':
        cost += 20;
        break;
      case 'eco':
        cost += 5;
        break;
      case 'fragile':
        cost += 50;
        break;
    }
    this.totalCost = cost;
  }


  reset() {
    this.currentStep = 1;
    this.showErrors = false;
    this.bookingId = null;
    this.receiverInfo = {
      name: '',
      address: '',
      pin: '',
      contact: '',
      countryCode: '+91'
    };
    this.parcelDetails = {
      size: 'small',
      weight: '<500g',
      contentDescription: '',
      deliverySpeed: 'standard',
      packaging: 'Standard',
      pickupDate: '',
      dropDate: '',
      pickupTime: '',
      dropTime: ''
    };
    this.payment = {
      mode: 'Debit Card',
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      cvv: ''
    };
    this.errors = {
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      cvv: ''
    };
    this.totalCost = 100;
    this.dateTimeErrors = {
      pickupPast: false,
      dropBeforePickup: false
    };
  }
}
