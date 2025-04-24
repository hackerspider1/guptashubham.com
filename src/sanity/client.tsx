import { createClient } from '@sanity/client'

export const projectId = "mr5wnv0b"
export const dataset = "production"
export const apiVersion = "v2023-06-21" // Use latest API version

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // For performance in production
  apiVersion,
  perspective: "published",
  stega: {
    enabled: false, // Disabled to avoid studioUrl requirement
  },
  // Add token for authenticated requests if needed
  // token: process.env.SANITY_API_TOKEN,
})

// Read-only client optimized for production
export const cdnClient = client

// For authenticated requests (optional)
export const previewClient = createClient({
  projectId,
  dataset,
  useCdn: false, // Never use CDN for authenticated requests to get latest content
  apiVersion,
  perspective: "published",
  token: process.env.SANITY_API_TOKEN,
})

// Helper function to use the appropriate client
export const getClient = (preview = false) => (preview ? previewClient : cdnClient)