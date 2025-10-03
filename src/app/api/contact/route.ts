// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimit = checkRateLimit(request);
    if (!rateLimit.success) {
      return NextResponse.json(
        { 
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(rateLimit.reset).toISOString(),
          }
        }
      );
    }

    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get your email from environment variable
    const adminEmail = process.env.ADMIN_EMAIL || "your-email@example.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    // If Resend API key is configured, use Resend
    if (resendApiKey) {
      console.log("Sending email via Resend...");
      console.log("To:", adminEmail);
      console.log("Reply-To:", email);
      
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: adminEmail,
          reply_to: email,
          subject: `[TextShare Contact] ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
              <div style="background: linear-gradient(135deg, #1a5fb4 0%, #ff6b35 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">📧 New Contact Form Submission</h1>
              </div>
              
              <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
                  <h2 style="color: #1a5fb4; margin: 0 0 10px 0; font-size: 20px;">Contact Details</h2>
                  <p style="margin: 5px 0; color: #666;">
                    <strong style="color: #333;">Name:</strong> ${name}
                  </p>
                  <p style="margin: 5px 0; color: #666;">
                    <strong style="color: #333;">Email:</strong> 
                    <a href="mailto:${email}" style="color: #1a5fb4; text-decoration: none;">${email}</a>
                  </p>
                  <p style="margin: 5px 0; color: #666;">
                    <strong style="color: #333;">Subject:</strong> ${subject}
                  </p>
                </div>
                
                <div>
                  <h2 style="color: #1a5fb4; margin: 0 0 15px 0; font-size: 20px;">Message</h2>
                  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #1a5fb4;">
                    <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
                  <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #1a5fb4 0%, #ff6b35 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Reply to ${name}</a>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                <p>This email was sent from the TextShare contact form</p>
                <p>© ${new Date().getFullYear()} TextShare - Share Everything, No Cap</p>
              </div>
            </div>
          `
        })
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error("Resend API Error:", responseData);
        throw new Error(responseData.message || "Failed to send email via Resend");
      }
      
      console.log("Email sent successfully via Resend:", responseData);
    } else {
      // Fallback: Log to console if no email service configured
      console.log("=== NEW CONTACT FORM SUBMISSION ===");
      console.log("From:", name, `<${email}>`);
      console.log("Subject:", subject);
      console.log("Message:", message);
      console.log("===================================");
      
      // You can also store in database here if needed
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Message sent successfully" 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
