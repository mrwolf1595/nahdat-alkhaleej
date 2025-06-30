// utils/hijriConverter.ts

// This is a more accurate Hijri conversion utility
export class HijriConverter {
    // Hijri months in Arabic
    static hijriMonths = [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
      'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
      'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];
  
    // Convert Gregorian to Hijri
    static gregorianToHijri(gregorianDate: Date): { year: number; month: number; day: number; formatted: string } {
      // This is a more accurate conversion algorithm
      const jd = Math.floor((gregorianDate.getTime() / 86400000) + 2440587.5);
      const l = jd - 1948440 + 10632;
      const n = Math.floor((l - 1) / 10631);
      const l1 = l - 10631 * n + 354;
      const j = Math.floor((10985 - l1) / 5316) * Math.floor(50 * l1 / 17719) + 
                 Math.floor(l1 / 5670) * Math.floor(43 * l1 / 15238);
      const l2 = l1 - Math.floor((30 - j) / 15) * Math.floor(17719 * j / 50) - 
                 Math.floor(j / 16) * Math.floor(15238 * j / 43) + 29;
      const month = Math.floor(24 * l2 / 709);
      const day = l2 - Math.floor(709 * month / 24);
      const year = 30 * n + j - 30;
  
      return {
        year,
        month,
        day,
        formatted: `${day} ${this.hijriMonths[month - 1]} ${year}هـ`
      };
    }
  
    // Convert Hijri to Gregorian
    static hijriToGregorian(year: number, month: number, day: number): Date {
      const jd = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - 
                 Math.floor((month - 1) / 2) + day + 1948440 - 385;
      const gregorianDate = new Date((jd - 2440587.5) * 86400000);
      return gregorianDate;
    }
  
    // Format Hijri date
    static formatHijriDate(date: Date): string {
      const hijri = this.gregorianToHijri(date);
      return hijri.formatted;
    }
  
    // Get current Hijri date
    static getCurrentHijriDate(): string {
      return this.formatHijriDate(new Date());
    }
  }