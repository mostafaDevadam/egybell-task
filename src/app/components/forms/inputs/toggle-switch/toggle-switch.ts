import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, model, output, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitch),
      multi: true
    }
  ]
})
export class ToggleSwitch {
  name = input<string>();
  label = input<string>();
  isMobile = input<boolean>(false);
  size = input<'small' | 'medium' | 'large'>('medium'); // Add size input



  // Internal signal for the value
  private internalValue = signal<boolean>(false);

  // Output for value changes
  valueChange = output<boolean>();

  // For ControlValueAccessor
  disabled: boolean = false;
  private onChange: any = () => { };
  private onTouched: any = () => { };

  // Using model for two-way binding (Angular 17+)
  value = model<boolean>(false);


  // Computed classes based on size and mobile
  get toggleClasses(): string {
    const baseClasses = 'relative rounded-full transition-colors';

    if (this.isMobile() || this.size() === 'large') {
      // Larger size for mobile
      return `${baseClasses} w-14 h-7`; // w-14 = 3.5rem, h-7 = 1.75rem
    } else if (this.size() === 'small') {
      return `${baseClasses} w-8 h-4`; // Small size
    } else {
      // Default medium size
      return `${baseClasses} w-11 h-6`;
    }
  }

  get knobClasses(): string {
    const baseClasses = 'absolute bg-white rounded-full transition-transform top-0.5 left-0.5';

    if (this.isMobile() || this.size() === 'large') {
      // Larger knob for mobile
      return `${baseClasses} w-6 h-6 ${this.value() ? 'translate-x-7' : 'translate-x-0'
        }`;
    } else if (this.size() === 'small') {
      return `${baseClasses} w-3 h-3 ${this.value() ? 'translate-x-4' : 'translate-x-0'
        }`;
    } else {
      // Default medium size
      return `${baseClasses} w-5 h-5 ${this.value() ? 'translate-x-5' : 'translate-x-0'
        }`;
    }
  }

  get containerClasses(): string {
    const baseClasses = 'flex items-center cursor-pointer gap-2 sm:gap-3';
    const mobileClasses = this.isMobile() ? 'mt-5 justify-between w-full' : '';
    return `${baseClasses} ${mobileClasses}`.trim();
  }

  handleToggle(): void {
    if (this.disabled) return;

    const newValue = !this.value();
    this.value.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  getLabelClasses(): string {
    const baseClasses = 'flex items-center cursor-pointer gap-2 sm:gap-3';
    const mobileClasses = this.isMobile() ? 'mt-5 justify-between' : '';
    return `${baseClasses} ${mobileClasses}`;
  }

  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this.value.set(value || false);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


}
