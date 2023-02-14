export const REGEX = {
  PASSWORD_VALIDATION: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"),
  LOWERCASE_LETTER: new RegExp("(?=.*[a-z])"),
  UPPERCASE_LETTER: new RegExp("(?=.*[A-Z])"),
  NUMERIC_CHAR: new RegExp("(?=.*[0-9])"),
  SPECIAL_CHAR: new RegExp("(?=.*[!@#\$%\^&\*])"),
  EMAIL_VALIDATION: new RegExp("^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$", "i")
}

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || '';
