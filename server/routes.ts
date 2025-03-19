import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertPaymentSchema 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({
        message: "Contact form submitted successfully",
        submission
      });
    } catch (error) {
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      } else {
        res.status(500).json({ 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Payment confirmation
  app.post("/api/payment-confirmation", async (req: Request, res: Response) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      
      const confirmation = await storage.createPaymentConfirmation(validatedData);
      
      res.status(201).json({
        message: "Payment confirmation submitted successfully",
        confirmation
      });
    } catch (error) {
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      } else {
        res.status(500).json({ 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Get contact submissions (admin endpoint)
  app.get("/api/admin/contacts", async (req: Request, res: Response) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ 
        message: "An error occurred while retrieving contact submissions" 
      });
    }
  });

  // Get payment confirmations (admin endpoint)
  app.get("/api/admin/payments", async (req: Request, res: Response) => {
    try {
      const payments = await storage.getAllPaymentConfirmations();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ 
        message: "An error occurred while retrieving payment confirmations" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
