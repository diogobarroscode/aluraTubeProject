import { createClient } from "@supabase/supabase-js";


const PROJECT_URL = "https://gbdmaqjxzyehjkmbmrqn.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZG1hcWp4enllaGprbWJtcnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0ODczNTMsImV4cCI6MTk4OTA2MzM1M30.T1fMr1LcYjVioKAWp9H8GnwbmhG2fgtdJWEdlN9Gcjk";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos(){
            return supabase.from("video")
                    .select("*");
                    
        }
    }
}