import { Coordinates } from '../../types/coordinates';

export class CoordinatesHelper {
  static getXYFromAddress(address: string): Coordinates {
    // Remove the "0x" prefix and convert the address to BigInt
    let bigIntAddress = BigInt(address);

    // Extract the last 64 bits (x and y coordinates)
    let x = Number((bigIntAddress >> 32n) & 0xFFFFFFFFn); // Convert x to number
    let y = Number(bigIntAddress & 0xFFFFFFFFn); // Convert y to number

    return {
      x,
      y,
    };
  }
}
