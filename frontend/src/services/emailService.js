"use server";

import React from 'react';
import { Resend } from 'resend';
import { FeedbackEmail } from '../email/FeedbackEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const validateFeedback = (feedbackData) => {
  if (!feedbackData.email || !feedbackData.feedbackType) {
    return "Missing required fields";
  }
  // Add any other validation as needed
  return null;
};

export const sendFeedbackEmail = async (feedbackData) => {
  try {
    const validationError = validateFeedback(feedbackData);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const data = await resend.emails.send({
      from: 'Polydomo Feedback <onboarding@resend.dev>',
      to: 'kim.nguyen.afk@gmail.com',
      subject: `Polydomo Feedback: ${feedbackData.feedbackType}`,
      react: React.createElement(FeedbackEmail, {
        feedback: feedbackData
      }),
      reply_to: feedbackData.email || undefined
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}; 