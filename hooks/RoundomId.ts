// در کامپوننت یا هوک سمت کلاینت
export const generateRandomId = (): string => {
    // بررسی پشتیبانی مرورگر
    if (typeof window !== 'undefined' && 'crypto' in window) {
      return window.crypto.randomUUID();
    } else {
      // فالِبک برای مرورگرهای قدیمی
      return Math.random().toString(36).substring(2, 9);
    }
  };
  
