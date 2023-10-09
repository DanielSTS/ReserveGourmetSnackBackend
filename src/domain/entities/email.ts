export default class Email {
  constructor(readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value) {
      throw new Error('Empty email.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new Error('Invalid email.');
    }
  }

  isEqual(other: any): boolean {
    if (other instanceof Email) {
      return this.value === other.value;
    }
    return false;
  }
}
