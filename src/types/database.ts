// Généré depuis la base Supabase (supabase gen types typescript --linked) : ne pas modifier à la main.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      assessment_questions: {
        Row: {
          assessment_id: string
          question_id: string
          sort_order: number
        }
        Insert: {
          assessment_id: string
          question_id: string
          sort_order?: number
        }
        Update: {
          assessment_id?: string
          question_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          chapter_id: string | null
          created_at: string
          duration_s: number | null
          exam_type: Database["public"]["Enums"]["exam_type"] | null
          exam_year: number | null
          id: string
          is_premium: boolean
          kind: Database["public"]["Enums"]["assessment_kind"]
          level_id: number
          series_id: number | null
          shuffle_options: boolean
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          subject_id: number
          title: string
          updated_at: string
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          duration_s?: number | null
          exam_type?: Database["public"]["Enums"]["exam_type"] | null
          exam_year?: number | null
          id?: string
          is_premium?: boolean
          kind: Database["public"]["Enums"]["assessment_kind"]
          level_id: number
          series_id?: number | null
          shuffle_options?: boolean
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          subject_id: number
          title: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          duration_s?: number | null
          exam_type?: Database["public"]["Enums"]["exam_type"] | null
          exam_year?: number | null
          id?: string
          is_premium?: boolean
          kind?: Database["public"]["Enums"]["assessment_kind"]
          level_id?: number
          series_id?: number | null
          shuffle_options?: boolean
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          subject_id?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      attempt_answers: {
        Row: {
          attempt_id: string
          is_correct: boolean
          points_awarded: number
          question_id: string
          response: Json | null
        }
        Insert: {
          attempt_id: string
          is_correct: boolean
          points_awarded: number
          question_id: string
          response?: Json | null
        }
        Update: {
          attempt_id?: string
          is_correct?: boolean
          points_awarded?: number
          question_id?: string
          response?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "attempt_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempt_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      attempts: {
        Row: {
          assessment_id: string
          client_ref: string | null
          client_submitted_at: string | null
          deadline_at: string | null
          id: string
          late_sync: boolean
          max_score: number | null
          option_order: Json
          saved_answers: Json
          score: number | null
          score_20: number | null
          started_at: string
          status: Database["public"]["Enums"]["attempt_status"]
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          assessment_id: string
          client_ref?: string | null
          client_submitted_at?: string | null
          deadline_at?: string | null
          id?: string
          late_sync?: boolean
          max_score?: number | null
          option_order?: Json
          saved_answers?: Json
          score?: number | null
          score_20?: number | null
          started_at?: string
          status?: Database["public"]["Enums"]["attempt_status"]
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          assessment_id?: string
          client_ref?: string | null
          client_submitted_at?: string | null
          deadline_at?: string | null
          id?: string
          late_sync?: boolean
          max_score?: number | null
          option_order?: Json
          saved_answers?: Json
          score?: number | null
          score_20?: number | null
          started_at?: string
          status?: Database["public"]["Enums"]["attempt_status"]
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: number
          meta: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: never
          meta?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: never
          meta?: Json
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          address_text: string | null
          booked_by: string
          cancel_reason: string | null
          commission_fcfa: number
          completed_at: string | null
          created_at: string
          ends_at: string
          id: string
          level_id: number
          mode: Database["public"]["Enums"]["teaching_mode"]
          price_fcfa: number
          room_name: string | null
          starts_at: string
          status: Database["public"]["Enums"]["booking_status"]
          student_id: string
          subject_id: number
          tutor_id: string
        }
        Insert: {
          address_text?: string | null
          booked_by: string
          cancel_reason?: string | null
          commission_fcfa?: number
          completed_at?: string | null
          created_at?: string
          ends_at: string
          id?: string
          level_id: number
          mode: Database["public"]["Enums"]["teaching_mode"]
          price_fcfa: number
          room_name?: string | null
          starts_at: string
          status?: Database["public"]["Enums"]["booking_status"]
          student_id: string
          subject_id: number
          tutor_id: string
        }
        Update: {
          address_text?: string | null
          booked_by?: string
          cancel_reason?: string | null
          commission_fcfa?: number
          completed_at?: string | null
          created_at?: string
          ends_at?: string
          id?: string
          level_id?: number
          mode?: Database["public"]["Enums"]["teaching_mode"]
          price_fcfa?: number
          room_name?: string | null
          starts_at?: string
          status?: Database["public"]["Enums"]["booking_status"]
          student_id?: string
          subject_id?: number
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_booked_by_fkey"
            columns: ["booked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      chapter_mastery: {
        Row: {
          attempts_count: number
          avg_score_20: number | null
          best_score_20: number | null
          chapter_id: string
          last_attempt_at: string | null
          last_score_20: number | null
          user_id: string
        }
        Insert: {
          attempts_count?: number
          avg_score_20?: number | null
          best_score_20?: number | null
          chapter_id: string
          last_attempt_at?: string | null
          last_score_20?: number | null
          user_id: string
        }
        Update: {
          attempts_count?: number
          avg_score_20?: number | null
          best_score_20?: number | null
          chapter_id?: string
          last_attempt_at?: string | null
          last_score_20?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_mastery_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapter_mastery_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          created_at: string
          id: string
          number: number
          program_id: number
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["publish_status"]
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          number: number
          program_id: number
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["publish_status"]
          summary?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          number?: number
          program_id?: number
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["publish_status"]
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          id: number
          name: string
          region_id: number
          slug: string
        }
        Insert: {
          id?: number
          name: string
          region_id: number
          slug: string
        }
        Update: {
          id?: number
          name?: string
          region_id?: number
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      consent_requests: {
        Row: {
          consumed_at: string | null
          created_at: string
          expires_at: string
          id: string
          parent_phone: string
          student_id: string
          token_hash: string
        }
        Insert: {
          consumed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          parent_phone: string
          student_id: string
          token_hash: string
        }
        Update: {
          consumed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          parent_phone?: string
          student_id?: string
          token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_requests_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          granted_at: string
          granted_by: string
          id: string
          revoked_at: string | null
          subject_user_id: string
          type: Database["public"]["Enums"]["consent_type"]
          version: string
        }
        Insert: {
          granted_at?: string
          granted_by: string
          id?: string
          revoked_at?: string | null
          subject_user_id: string
          type: Database["public"]["Enums"]["consent_type"]
          version: string
        }
        Update: {
          granted_at?: string
          granted_by?: string
          id?: string
          revoked_at?: string | null
          subject_user_id?: string
          type?: Database["public"]["Enums"]["consent_type"]
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "consents_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consents_subject_user_id_fkey"
            columns: ["subject_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_members: {
        Row: {
          conversation_id: string
          last_read_at: string | null
          member_role: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          last_read_at?: string | null
          member_role: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          last_read_at?: string | null
          member_role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_members_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          booking_id: string | null
          created_at: string
          created_by: string
          id: string
          last_message_at: string
          parent_id: string | null
          status: string
          student_id: string | null
          tutor_id: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          created_by: string
          id?: string
          last_message_at?: string
          parent_id?: string | null
          status?: string
          student_id?: string | null
          tutor_id: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          last_message_at?: string
          parent_id?: string | null
          status?: string
          student_id?: string | null
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      daily_activity: {
        Row: {
          attempts_submitted: number
          day: string
          lessons_completed: number
          minutes: number
          user_id: string
        }
        Insert: {
          attempts_submitted?: number
          day: string
          lessons_completed?: number
          minutes?: number
          user_id: string
        }
        Update: {
          attempts_submitted?: number
          day?: string
          lessons_completed?: number
          minutes?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_sessions: {
        Row: {
          ends_on: string | null
          exam_type: Database["public"]["Enums"]["exam_type"]
          id: string
          is_official: boolean
          starts_on: string
          year: number
        }
        Insert: {
          ends_on?: string | null
          exam_type: Database["public"]["Enums"]["exam_type"]
          id: string
          is_official?: boolean
          starts_on: string
          year: number
        }
        Update: {
          ends_on?: string | null
          exam_type?: Database["public"]["Enums"]["exam_type"]
          id?: string
          is_official?: boolean
          starts_on?: string
          year?: number
        }
        Relationships: []
      }
      lesson_bodies: {
        Row: {
          body_html: string
          body_md: string
          lesson_id: string
          updated_at: string
        }
        Insert: {
          body_html?: string
          body_md?: string
          lesson_id: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          body_md?: string
          lesson_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_bodies_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: true
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          last_position_s: number | null
          lesson_id: string
          percent: number
          status: Database["public"]["Enums"]["progress_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          last_position_s?: number | null
          lesson_id: string
          percent?: number
          status?: Database["public"]["Enums"]["progress_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          last_position_s?: number | null
          lesson_id?: string
          percent?: number
          status?: Database["public"]["Enums"]["progress_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          chapter_id: string
          estimated_minutes: number
          id: string
          is_premium: boolean
          number: number
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          title: string
          updated_at: string
          version: number
        }
        Insert: {
          chapter_id: string
          estimated_minutes?: number
          id?: string
          is_premium?: boolean
          number: number
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          title: string
          updated_at?: string
          version?: number
        }
        Update: {
          chapter_id?: string
          estimated_minutes?: number
          id?: string
          is_premium?: boolean
          number?: number
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          title?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      level_series: {
        Row: {
          level_id: number
          series_id: number
        }
        Insert: {
          level_id: number
          series_id: number
        }
        Update: {
          level_id?: number
          series_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "level_series_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "level_series_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          code: string
          cycle: Database["public"]["Enums"]["cycle"]
          exam_type: Database["public"]["Enums"]["exam_type"] | null
          id: number
          name: string
          sort_order: number
        }
        Insert: {
          code: string
          cycle: Database["public"]["Enums"]["cycle"]
          exam_type?: Database["public"]["Enums"]["exam_type"] | null
          id: number
          name: string
          sort_order: number
        }
        Update: {
          code?: string
          cycle?: Database["public"]["Enums"]["cycle"]
          exam_type?: Database["public"]["Enums"]["exam_type"] | null
          id?: number
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      media: {
        Row: {
          assessment_id: string | null
          bucket: string
          downloadable: boolean
          duration_s: number | null
          id: string
          is_premium: boolean
          kind: Database["public"]["Enums"]["media_kind"]
          lesson_id: string | null
          path: string
          size_bytes: number
          title: string
          variants: Json
        }
        Insert: {
          assessment_id?: string | null
          bucket: string
          downloadable?: boolean
          duration_s?: number | null
          id?: string
          is_premium?: boolean
          kind: Database["public"]["Enums"]["media_kind"]
          lesson_id?: string | null
          path: string
          size_bytes: number
          title: string
          variants?: Json
        }
        Update: {
          assessment_id?: string | null
          bucket?: string
          downloadable?: boolean
          duration_s?: number | null
          id?: string
          is_premium?: boolean
          kind?: Database["public"]["Enums"]["media_kind"]
          lesson_id?: string | null
          path?: string
          size_bytes?: number
          title?: string
          variants?: Json
        }
        Relationships: [
          {
            foreignKeyName: "media_assessment_fk"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          deleted_at: string | null
          id: string
          sender_id: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          sender_id: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhoods: {
        Row: {
          city_id: number
          id: number
          name: string
        }
        Insert: {
          city_id: number
          id?: number
          name: string
        }
        Update: {
          city_id?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "neighborhoods_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          params: Json
          read_at: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          params?: Json
          read_at?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          params?: Json
          read_at?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_links: {
        Row: {
          approved_at: string | null
          created_at: string
          parent_id: string
          relationship: string | null
          status: Database["public"]["Enums"]["link_status"]
          student_id: string
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          parent_id: string
          relationship?: string | null
          status?: Database["public"]["Enums"]["link_status"]
          student_id: string
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          parent_id?: string
          relationship?: string | null
          status?: Database["public"]["Enums"]["link_status"]
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_links_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parent_links_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_events: {
        Row: {
          event_id: string
          id: number
          payload: Json
          processed_at: string | null
          provider: string
          received_at: string
        }
        Insert: {
          event_id: string
          id?: never
          payload: Json
          processed_at?: string | null
          provider: string
          received_at?: string
        }
        Update: {
          event_id?: string
          id?: never
          payload?: Json
          processed_at?: string | null
          provider?: string
          received_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_fcfa: number
          beneficiary_id: string | null
          booking_id: string | null
          channel: Database["public"]["Enums"]["payment_channel"] | null
          created_at: string
          id: string
          paid_at: string | null
          payer_id: string
          plan_id: number | null
          provider: string
          provider_ref: string | null
          purpose: Database["public"]["Enums"]["payment_purpose"]
          reference: string
          status: Database["public"]["Enums"]["payment_status"]
        }
        Insert: {
          amount_fcfa: number
          beneficiary_id?: string | null
          booking_id?: string | null
          channel?: Database["public"]["Enums"]["payment_channel"] | null
          created_at?: string
          id?: string
          paid_at?: string | null
          payer_id: string
          plan_id?: number | null
          provider: string
          provider_ref?: string | null
          purpose: Database["public"]["Enums"]["payment_purpose"]
          reference: string
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Update: {
          amount_fcfa?: number
          beneficiary_id?: string | null
          booking_id?: string | null
          channel?: Database["public"]["Enums"]["payment_channel"] | null
          created_at?: string
          id?: string
          paid_at?: string | null
          payer_id?: string
          plan_id?: number | null
          provider?: string
          provider_ref?: string | null
          purpose?: Database["public"]["Enums"]["payment_purpose"]
          reference?: string
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "payments_beneficiary_id_fkey"
            columns: ["beneficiary_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payer_id_fkey"
            columns: ["payer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          code: string
          duration_days: number
          id: number
          is_active: boolean
          name: string
          price_fcfa: number
          sort_order: number
        }
        Insert: {
          code: string
          duration_days: number
          id?: number
          is_active?: boolean
          name: string
          price_fcfa: number
          sort_order?: number
        }
        Update: {
          code?: string
          duration_days?: number
          id?: number
          is_active?: boolean
          name?: string
          price_fcfa?: number
          sort_order?: number
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_key: string | null
          city_id: number | null
          created_at: string
          deleted_at: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          locale: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          avatar_key?: string | null
          city_id?: number | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          first_name: string
          id: string
          last_name: string
          locale?: string
          phone?: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          avatar_key?: string | null
          city_id?: number | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          locale?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          coefficient: number
          id: number
          level_id: number
          series_id: number | null
          sort_order: number
          subject_id: number
          weekly_hours: number | null
        }
        Insert: {
          coefficient?: number
          id?: number
          level_id: number
          series_id?: number | null
          sort_order?: number
          subject_id: number
          weekly_hours?: number | null
        }
        Update: {
          coefficient?: number
          id?: number
          level_id?: number
          series_id?: number | null
          sort_order?: number
          subject_id?: number
          weekly_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      question_options: {
        Row: {
          id: string
          label_html: string
          question_id: string
          slug: string
          sort_order: number
        }
        Insert: {
          id?: string
          label_html: string
          question_id: string
          slug: string
          sort_order?: number
        }
        Update: {
          id?: string
          label_html?: string
          question_id?: string
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          chapter_id: string | null
          difficulty: number
          explanation_html: string
          id: string
          points: number
          prompt_html: string
          slug: string | null
          status: Database["public"]["Enums"]["publish_status"]
          subject_id: number
          tags: string[]
          type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          chapter_id?: string | null
          difficulty?: number
          explanation_html?: string
          id?: string
          points: number
          prompt_html: string
          slug?: string | null
          status?: Database["public"]["Enums"]["publish_status"]
          subject_id: number
          tags?: string[]
          type: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          chapter_id?: string | null
          difficulty?: number
          explanation_html?: string
          id?: string
          points?: number
          prompt_html?: string
          slug?: string | null
          status?: Database["public"]["Enums"]["publish_status"]
          subject_id?: number
          tags?: string[]
          type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "questions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          handled_at: string | null
          handled_by: string | null
          id: string
          reason: string
          reporter_id: string
          status: string
          target_id: string
          target_type: Database["public"]["Enums"]["report_target"]
        }
        Insert: {
          created_at?: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          reason: string
          reporter_id: string
          status?: string
          target_id: string
          target_type: Database["public"]["Enums"]["report_target"]
        }
        Update: {
          created_at?: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          status?: string
          target_id?: string
          target_type?: Database["public"]["Enums"]["report_target"]
        }
        Relationships: [
          {
            foreignKeyName: "reports_handled_by_fkey"
            columns: ["handled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          author_id: string
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          moderated_at: string | null
          moderated_by: string | null
          rating: number
          status: Database["public"]["Enums"]["review_status"]
          tutor_id: string
        }
        Insert: {
          author_id: string
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          rating: number
          status?: Database["public"]["Enums"]["review_status"]
          tutor_id: string
        }
        Update: {
          author_id?: string
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          rating?: number
          status?: Database["public"]["Enums"]["review_status"]
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_moderated_by_fkey"
            columns: ["moderated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      series: {
        Row: {
          code: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          code: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          code?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      student_profiles: {
        Row: {
          birth_date: string
          consent_status: Database["public"]["Enums"]["consent_status"]
          data_saver: boolean
          level_id: number
          school_name: string | null
          series_id: number | null
          student_code: string
          updated_at: string
          user_id: string
        }
        Insert: {
          birth_date: string
          consent_status?: Database["public"]["Enums"]["consent_status"]
          data_saver?: boolean
          level_id: number
          school_name?: string | null
          series_id?: number | null
          student_code?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          birth_date?: string
          consent_status?: Database["public"]["Enums"]["consent_status"]
          data_saver?: boolean
          level_id?: number
          school_name?: string | null
          series_id?: number | null
          student_code?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_profiles_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          code: string
          color_token: string
          icon: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          code: string
          color_token: string
          icon: string
          id?: number
          name: string
          slug: string
        }
        Update: {
          code?: string
          color_token?: string
          icon?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          payer_id: string
          payment_id: string | null
          plan_id: number
          starts_at: string
          status: string
          student_id: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          payer_id: string
          payment_id?: string | null
          plan_id: number
          starts_at: string
          status?: string
          student_id: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          payer_id?: string
          payment_id?: string | null
          plan_id?: number
          starts_at?: string
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_payer_id_fkey"
            columns: ["payer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_payment_fk"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_availability: {
        Row: {
          end_time: string
          id: string
          start_time: string
          tutor_id: string
          weekday: number
        }
        Insert: {
          end_time: string
          id?: string
          start_time: string
          tutor_id: string
          weekday: number
        }
        Update: {
          end_time?: string
          id?: string
          start_time?: string
          tutor_id?: string
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "tutor_availability_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tutor_documents: {
        Row: {
          created_at: string
          id: string
          purge_after: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          storage_path: string
          tutor_id: string
          type: Database["public"]["Enums"]["document_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          purge_after?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          storage_path: string
          tutor_id: string
          type: Database["public"]["Enums"]["document_type"]
        }
        Update: {
          created_at?: string
          id?: string
          purge_after?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          storage_path?: string
          tutor_id?: string
          type?: Database["public"]["Enums"]["document_type"]
        }
        Relationships: [
          {
            foreignKeyName: "tutor_documents_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_documents_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tutor_levels: {
        Row: {
          level_id: number
          tutor_id: string
        }
        Insert: {
          level_id: number
          tutor_id: string
        }
        Update: {
          level_id?: number
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_levels_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_levels_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tutor_private: {
        Row: {
          payout_channel: Database["public"]["Enums"]["payment_channel"] | null
          payout_phone: string | null
          user_id: string
          whatsapp_e164: string | null
        }
        Insert: {
          payout_channel?: Database["public"]["Enums"]["payment_channel"] | null
          payout_phone?: string | null
          user_id: string
          whatsapp_e164?: string | null
        }
        Update: {
          payout_channel?: Database["public"]["Enums"]["payment_channel"] | null
          payout_phone?: string | null
          user_id?: string
          whatsapp_e164?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_private_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tutor_profiles: {
        Row: {
          bio: string
          city_id: number | null
          created_at: string
          headline: string
          hourly_rate_fcfa: number
          mode: Database["public"]["Enums"]["teaching_mode"]
          neighborhood_id: number | null
          photo_path: string | null
          rating_avg: number | null
          rating_count: number
          rejection_reason: string | null
          status: Database["public"]["Enums"]["tutor_status"]
          submitted_at: string | null
          updated_at: string
          user_id: string
          verified_at: string | null
          verified_by: string | null
          whatsapp_opt_in: boolean
          years_experience: number
        }
        Insert: {
          bio?: string
          city_id?: number | null
          created_at?: string
          headline?: string
          hourly_rate_fcfa?: number
          mode?: Database["public"]["Enums"]["teaching_mode"]
          neighborhood_id?: number | null
          photo_path?: string | null
          rating_avg?: number | null
          rating_count?: number
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["tutor_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
          whatsapp_opt_in?: boolean
          years_experience?: number
        }
        Update: {
          bio?: string
          city_id?: number | null
          created_at?: string
          headline?: string
          hourly_rate_fcfa?: number
          mode?: Database["public"]["Enums"]["teaching_mode"]
          neighborhood_id?: number | null
          photo_path?: string | null
          rating_avg?: number | null
          rating_count?: number
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["tutor_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
          whatsapp_opt_in?: boolean
          years_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "tutor_profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_profiles_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_profiles_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_qualifications: {
        Row: {
          id: string
          institution: string
          title: string
          tutor_id: string
          year: number | null
        }
        Insert: {
          id?: string
          institution: string
          title: string
          tutor_id: string
          year?: number | null
        }
        Update: {
          id?: string
          institution?: string
          title?: string
          tutor_id?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_qualifications_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tutor_subjects: {
        Row: {
          subject_id: number
          tutor_id: string
        }
        Insert: {
          subject_id: number
          tutor_id: string
        }
        Update: {
          subject_id?: number
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_subjects_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_subjects_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_get_assessment: { Args: { p_assessment: string }; Returns: Json }
      admin_log: {
        Args: {
          p_action: string
          p_entity_id: string
          p_entity_type: string
          p_meta?: Json
        }
        Returns: undefined
      }
      admin_save_lesson_body: {
        Args: { p_html: string; p_lesson: string }
        Returns: undefined
      }
      apply_payment_event: {
        Args: {
          p_channel?: Database["public"]["Enums"]["payment_channel"]
          p_provider_ref: string
          p_reference: string
          p_status: Database["public"]["Enums"]["payment_status"]
        }
        Returns: Json
      }
      complete_lesson: { Args: { p_lesson: string }; Returns: undefined }
      confirm_parent_link: { Args: { p_parent: string }; Returns: undefined }
      create_payment_intent: {
        Args: {
          p_beneficiary: string
          p_channel: Database["public"]["Enums"]["payment_channel"]
          p_plan_code: string
        }
        Returns: Json
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      decide_parental_consent: {
        Args: {
          p_decision: Database["public"]["Enums"]["consent_status"]
          p_token: string
        }
        Returns: undefined
      }
      get_assessments_catalog: {
        Args: never
        Returns: {
          chapter_id: string
          duration_s: number
          exam_type: Database["public"]["Enums"]["exam_type"]
          exam_year: number
          id: string
          is_premium: boolean
          kind: Database["public"]["Enums"]["assessment_kind"]
          level_code: string
          questions_count: number
          slug: string
          subject_code: string
          title: string
          total_points: number
        }[]
      }
      get_attempt_review: { Args: { p_attempt: string }; Returns: Json }
      get_attempt_session: { Args: { p_attempt: string }; Returns: Json }
      get_consent_request: { Args: { p_token: string }; Returns: Json }
      get_my_consent_request: { Args: never; Returns: Json }
      get_pending_parent_links: {
        Args: never
        Returns: {
          created_at: string
          first_name: string
          last_name: string
          parent_id: string
        }[]
      }
      get_student_dashboard: { Args: { p_student: string }; Returns: Json }
      get_tutor_profile: { Args: { p_tutor: string }; Returns: Json }
      link_child_by_code: { Args: { p_code: string }; Returns: undefined }
      record_signup_consents: {
        Args: { p_version: string }
        Returns: undefined
      }
      request_parental_consent: {
        Args: { p_parent_phone: string }
        Returns: undefined
      }
      review_tutor: {
        Args: {
          p_decision: Database["public"]["Enums"]["tutor_status"]
          p_reason?: string
          p_tutor: string
        }
        Returns: undefined
      }
      save_attempt_answers: {
        Args: { p_answers: Json; p_attempt: string }
        Returns: undefined
      }
      search_tutors: {
        Args: {
          p_city?: string
          p_level?: string
          p_limit?: number
          p_min_rating?: number
          p_mode?: string
          p_offset?: number
          p_price_max?: number
          p_sort?: string
          p_subject?: string
        }
        Returns: {
          city: string
          display_name: string
          headline: string
          hourly_rate_fcfa: number
          levels: string[]
          mode: Database["public"]["Enums"]["teaching_mode"]
          neighborhood: string
          rating_avg: number
          rating_count: number
          subjects: string[]
          user_id: string
        }[]
      }
      set_otp_channel: {
        Args: { p_channel: string; p_phone: string }
        Returns: undefined
      }
      start_attempt: { Args: { p_assessment: string }; Returns: Json }
      start_conversation: {
        Args: { p_body: string; p_student?: string; p_tutor: string }
        Returns: string
      }
      submit_attempt: {
        Args: {
          p_answers: Json
          p_attempt: string
          p_client_ref?: string
          p_client_submitted_at?: string
        }
        Returns: Json
      }
      submit_tutor_for_review: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "student" | "parent" | "tutor" | "admin"
      assessment_kind: "exercise" | "quiz" | "mock_exam" | "past_paper"
      attempt_status: "in_progress" | "submitted" | "expired"
      booking_status:
        | "requested"
        | "accepted"
        | "declined"
        | "paid"
        | "completed"
        | "cancelled"
        | "disputed"
        | "refunded"
        | "expired"
      consent_status: "not_required" | "pending" | "granted" | "refused"
      consent_type: "terms" | "privacy" | "parental" | "marketing"
      cycle: "elementaire" | "moyen" | "secondaire"
      document_type: "cni" | "passport" | "diploma" | "criminal_record"
      exam_type: "CFEE" | "BFEM" | "BAC"
      link_status: "pending" | "active" | "revoked"
      media_kind: "pdf" | "video" | "audio" | "image"
      payment_channel: "wave" | "orange_money" | "free_money" | "card" | "other"
      payment_purpose: "subscription" | "booking"
      payment_status:
        | "pending"
        | "succeeded"
        | "failed"
        | "cancelled"
        | "refunded"
      progress_status: "not_started" | "in_progress" | "completed"
      publish_status: "draft" | "review" | "published" | "archived"
      question_type:
        | "single_choice"
        | "multiple_choice"
        | "true_false"
        | "short_text"
        | "numeric"
      report_target: "message" | "review" | "tutor" | "user"
      review_status: "pending" | "published" | "rejected"
      teaching_mode: "online" | "home" | "both"
      tutor_status: "draft" | "pending" | "approved" | "rejected" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "parent", "tutor", "admin"],
      assessment_kind: ["exercise", "quiz", "mock_exam", "past_paper"],
      attempt_status: ["in_progress", "submitted", "expired"],
      booking_status: [
        "requested",
        "accepted",
        "declined",
        "paid",
        "completed",
        "cancelled",
        "disputed",
        "refunded",
        "expired",
      ],
      consent_status: ["not_required", "pending", "granted", "refused"],
      consent_type: ["terms", "privacy", "parental", "marketing"],
      cycle: ["elementaire", "moyen", "secondaire"],
      document_type: ["cni", "passport", "diploma", "criminal_record"],
      exam_type: ["CFEE", "BFEM", "BAC"],
      link_status: ["pending", "active", "revoked"],
      media_kind: ["pdf", "video", "audio", "image"],
      payment_channel: ["wave", "orange_money", "free_money", "card", "other"],
      payment_purpose: ["subscription", "booking"],
      payment_status: [
        "pending",
        "succeeded",
        "failed",
        "cancelled",
        "refunded",
      ],
      progress_status: ["not_started", "in_progress", "completed"],
      publish_status: ["draft", "review", "published", "archived"],
      question_type: [
        "single_choice",
        "multiple_choice",
        "true_false",
        "short_text",
        "numeric",
      ],
      report_target: ["message", "review", "tutor", "user"],
      review_status: ["pending", "published", "rejected"],
      teaching_mode: ["online", "home", "both"],
      tutor_status: ["draft", "pending", "approved", "rejected", "suspended"],
    },
  },
} as const
