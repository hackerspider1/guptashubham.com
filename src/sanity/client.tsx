import { createClient } from '@sanity/client'

export const projectId = "mr5wnv0b"
export const dataset = "production"
export const apiVersion = "2023-12-08" // Use a more recent API version

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // Use CDN for better performance
  apiVersion,
  perspective: "published",
  // Remove stega config that might cause issues
  // Add token if you need authenticated requests
  // token: process.env.SANITY_API_TOKEN,
})

// Optimized client for browser usage
export const browserClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
  perspective: "published",
  // Ensure this works in browser environment
  ...(typeof window !== 'undefined' && {
    // Browser-specific config
  })
})

// Helper function to get the appropriate client
export const getClient = () => {
  // Always use the regular client for now
  return client
}