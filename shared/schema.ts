import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  accountEmail: text("account_email").notNull(),
  transactionId: text("transaction_id").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  message: text("message"),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  firstName: true,
  lastName: true,
  contactEmail: true,
  accountEmail: true,
  transactionId: true,
  whatsappNumber: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const paymentConfirmations = pgTable("payment_confirmations", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull(),
  amount: text("amount").notNull(),
  senderName: text("sender_name").notNull(),
  senderNumber: text("sender_number").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default("NOW()"),
});

export const insertPaymentSchema = createInsertSchema(paymentConfirmations).pick({
  transactionId: true,
  amount: true,
  senderName: true,
  senderNumber: true,
  email: true,
});

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type PaymentConfirmation = typeof paymentConfirmations.$inferSelect;
