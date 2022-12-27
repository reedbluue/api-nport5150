export abstract class ValidationHelper {
  public static checkLength(string: string, min: number, max: number) {
    return string.length >= min || string.length <= max;
  }

  public static checkPort(number: number) {
    return number > 0 && number <= 99999;
  }

  public static validIp(ip: string) {
    const regex =
      /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i;
    return regex.test(ip);
  }

  public static validObjectId(id: string) {
    const regex = /^[a-fA-F0-9]{24}$/i;
    return regex.test(id);
  }
}
