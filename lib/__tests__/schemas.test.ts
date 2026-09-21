import { describe, it, expect } from "vitest";
import {
  loginSchema,
  registerSchema,
  contactSchema,
  forgotPasswordSchema,
  cardPaymentSchema,
  vodafonePaymentSchema,
} from "../schemas";

describe("loginSchema", () => {
  it("يقبل بيانات صحيحة", () => {
    const r = loginSchema.safeParse({ email: "a@b.com", password: "12345678" });
    expect(r.success).toBe(true);
  });

  it("يرفض بريد غير صالح", () => {
    const r = loginSchema.safeParse({ email: "bad", password: "12345678" });
    expect(r.success).toBe(false);
  });

  it("يرفض كلمة مرور قصيرة", () => {
    const r = loginSchema.safeParse({ email: "a@b.com", password: "123" });
    expect(r.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const valid = {
    name: "أحمد محمد",
    email: "a@b.com",
    password: "12345678",
    confirmPassword: "12345678",
    terms: true,
  };

  it("يقبل تسجيل صحيح", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it("يرفض كلمات مرور غير متطابقة", () => {
    const r = registerSchema.safeParse({ ...valid, confirmPassword: "different1" });
    expect(r.success).toBe(false);
  });

  it("يرفض بدون موافقة على الشروط", () => {
    const r = registerSchema.safeParse({ ...valid, terms: false });
    expect(r.success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("يرفض رسالة قصيرة جداً", () => {
    const r = contactSchema.safeParse({
      name: "أحمد",
      email: "a@b.com",
      subject: "سؤال",
      message: "قصير",
    });
    expect(r.success).toBe(false);
  });
});

describe("forgotPasswordSchema", () => {
  it("يقبل بريد صالح", () => {
    expect(forgotPasswordSchema.safeParse({ email: "a@b.com" }).success).toBe(true);
  });
});

describe("payment schemas", () => {
  it("يقبل بطاقة صحيحة", () => {
    const r = cardPaymentSchema.safeParse({
      cardNumber: "4242424242424242",
      expiry: "12/28",
      cvv: "123",
      cardName: "AHMED",
    });
    expect(r.success).toBe(true);
  });

  it("يرفض CVV غير صحيح", () => {
    const r = cardPaymentSchema.safeParse({
      cardNumber: "4242424242424242",
      expiry: "12/28",
      cvv: "1",
      cardName: "AHMED",
    });
    expect(r.success).toBe(false);
  });

  it("يرفض رقم فودافون غير صحيح", () => {
    const r = vodafonePaymentSchema.safeParse({ phone: "12345" });
    expect(r.success).toBe(false);
  });
});
