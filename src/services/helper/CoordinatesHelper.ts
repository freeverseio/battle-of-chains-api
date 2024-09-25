import { Coordinates } from '../../types/coordinates';

export class CoordinatesHelper {
  static getXYFromAttackAddress(address: string): Coordinates {
    let bigIntAddress = BigInt(address);

    // Extract the last 64 bits (x and y coordinates)
    let x = Number((bigIntAddress >> 32n) & 0xFFFFFFFFn); // Convert x to number
    let y = Number(bigIntAddress & 0xFFFFFFFFn); // Convert y to number

    return {
      x: String(x),
      y: String(y),
    };
  }

  static getXYFromAddress(address: string): Coordinates {
    const addressBigInt = BigInt(address);

    // Extract the first 80 bits (shift right by 80 bits) and apply a mask for the top 80 bits
    const x = addressBigInt >> 80n;

    // Extract the last 80 bits by applying a mask to get the least significant 80 bits
    const mask80bits = (1n << 80n) - 1n;  // This creates a mask with the last 80 bits set to 1
    const y = addressBigInt & mask80bits;

    return { 
      x: String(x), 
      y: String(y) 
    };
}


  static generateAddressFromXY(x: bigint, y: bigint): string {
    // Ensure that x and y are within the 80-bit range
    const max80Bits = (1n << 80n) - 1n; // Mask for 80 bits (all bits set to 1)
    if (x < 0n || x > max80Bits || y < 0n || y > max80Bits) {
        throw new Error("x and y must be within the 80-bit range.");
    }

    // Shift x by 80 bits to the left to make space for y, then OR with y
    const addressBigInt = (x << 80n) | y;

    // Convert BigInt to a hex string and pad with zeros if necessary
    let addressHex = addressBigInt.toString(16);

    // Ethereum addresses must be 40 hex characters long, pad if needed
    addressHex = addressHex.padStart(40, '0');

    // Return the Ethereum address with '0x' prefix
    return `0x${addressHex}`;
  }
  
}




