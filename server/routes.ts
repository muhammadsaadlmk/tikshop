import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertPaymentSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Simple contact form submission handler
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Just validate the data without actually storing it
      insertContactSchema.parse(req.body);
      
      // Return success response
      res.status(201).json({
        message: "Contact form submitted successfully",
        submission: req.body
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.issues.map(i => i.message).join(", ")
        });
      } else {
        res.status(500).json({ 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Simple payment confirmation handler 
  app.post("/api/payment-confirmation", async (req: Request, res: Response) => {
    try {
      // Just validate the data without actually storing it
      insertPaymentSchema.parse(req.body);
      
      // Return success response
      res.status(201).json({
        message: "Payment confirmation submitted successfully",
        confirmation: req.body
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.issues.map(i => i.message).join(", ")
        });
      } else {
        res.status(500).json({ 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Simplified empty endpoint responses
  app.get("/api/admin/contacts", (_req: Request, res: Response) => {
    res.status(200).json([]);
  });

  app.get("/api/admin/payments", (_req: Request, res: Response) => {
    res.status(200).json([]);
  });

  const httpServer = createServer(app);

  return httpServer;
}
