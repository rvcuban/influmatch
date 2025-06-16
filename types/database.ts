export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          company_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          company_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          company_type?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          price: number | null
          category: string | null
          image_url: string | null
          target_audience: string | null
          key_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          price?: number | null
          category?: string | null
          image_url?: string | null
          target_audience?: string | null
          key_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          price?: number | null
          category?: string | null
          image_url?: string | null
          target_audience?: string | null
          key_message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      creators: {
        Row: {
          id: string
          username: string
          full_name: string | null
          bio: string | null
          followers_count: number
          engagement_rate: number | null
          country: string | null
          categories: string[]
          hashtags: string[]
          tiktok_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          full_name?: string | null
          bio?: string | null
          followers_count: number
          engagement_rate?: number | null
          country?: string | null
          categories?: string[]
          hashtags?: string[]
          tiktok_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          bio?: string | null
          followers_count?: number
          engagement_rate?: number | null
          country?: string | null
          categories?: string[]
          hashtags?: string[]
          tiktok_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          product_id: string
          name: string
          status: 'draft' | 'active' | 'paused' | 'completed'
          mode: 'automatic' | 'manual'
          selected_niches: string[]
          budget_range: string | null
          min_followers: number | null
          max_followers: number | null
          min_engagement: number | null
          location: string | null
          language: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          name: string
          status?: 'draft' | 'active' | 'paused' | 'completed'
          mode: 'automatic' | 'manual'
          selected_niches?: string[]
          budget_range?: string | null
          min_followers?: number | null
          max_followers?: number | null
          min_engagement?: number | null
          location?: string | null
          language?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          name?: string
          status?: 'draft' | 'active' | 'paused' | 'completed'
          mode?: 'automatic' | 'manual'
          selected_niches?: string[]
          budget_range?: string | null
          min_followers?: number | null
          max_followers?: number | null
          min_engagement?: number | null
          location?: string | null
          language?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          campaign_id: string
          creator_id: string
          score: number
          status: 'pending' | 'contacted' | 'accepted' | 'rejected'
          match_reasons: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          creator_id: string
          score: number
          status?: 'pending' | 'contacted' | 'accepted' | 'rejected'
          match_reasons: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          creator_id?: string
          score?: number
          status?: 'pending' | 'contacted' | 'accepted' | 'rejected'
          match_reasons?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 