import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة").min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  remember: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "الاسم مطلوب").min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
    email: z.string().min(1, "البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صالح"),
    password: z
      .string()
      .min(1, "كلمة المرور مطلوبة")
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
    terms: z.boolean().refine((v) => v === true, { message: "يجب الموافقة على الشروط" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export const contactSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب").min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صالح"),
  subject: z.string().min(1, "اختر موضوع الرسالة"),
  message: z.string().min(1, "الرسالة مطلوبة").min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صالح"),
});

export const cardPaymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "رقم البطاقة مطلوب")
    .regex(/^[\d\s]{16,19}$/, "رقم البطاقة غير صالح"),
  expiry: z
    .string()
    .min(1, "تاريخ الانتهاء مطلوب")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "الصيغة MM/YY"),
  cvv: z.string().min(1, "CVV مطلوب").regex(/^\d{3,4}$/, "CVV غير صالح"),
  cardName: z.string().min(1, "الاسم على البطاقة مطلوب"),
});

export const vodafonePaymentSchema = z.object({
  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .regex(/^01[0-9]{9}$/, "رقم فودافون كاش غير صالح"),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type ContactForm = z.infer<typeof contactSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type CardPaymentForm = z.infer<typeof cardPaymentSchema>;
export type VodafonePaymentForm = z.infer<typeof vodafonePaymentSchema>;
