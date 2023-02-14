import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "../constants";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const registerUser = async ({ email, password, username, name }) => {
  try {
    const { data: auth, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (auth.user.id) {
      const { data: profile, error } = await supabase.from('profiles')
        .insert({
          id: auth.user.id,
          email: auth.user.email,
          username: username?.toLowerCase(),
          name
        })
        .select()
        .single();
      if (error) throw error;
      return { data: profile };
    }
  } catch (error) {
    return { error };
  }
}

export const loginUser = async ({ username, password }) => {
  try {
    const { data: profile, error } = await supabase.from('profiles').select().eq('username', username).single();
    if (error) throw error;
    if (profile) {
      const { data: auth, error } = await supabase.auth.signInWithPassword({ email: profile.email, password });
      if (error) throw error;
      return { data: auth, error };
    }
  } catch (error) {
    return { data: null, error };
  }
}

export const getUserSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { data: data.session };
  } catch (error) {
    return { error };
  }
}

export const getUserData = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    const { data: profile, error: errorProfile } = await supabase.from('profiles').select().eq('email', data.user.email).single();
    if (errorProfile) throw errorProfile;
    return { data: { ...data.user, ...profile } };
  } catch (error) {
    return { error };
  }
}

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { data: null };

  } catch (error) {
    return { error };
  }
}

export const sendRecoveryByUsername = async ({ username }, redirectUrl) => {
  try {
    const { data: profile, error } = await supabase.from('profiles').select().eq('username', username).single();
    if (error) throw error;
    if (profile) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(profile.email, { redirectTo: redirectUrl });
      if (error) throw error;
      return { data, error };
    }
  } catch (error) {
    return { error };
  }
}

export const sendRecoveryByEmail = async ({ email }, redirectUrl) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
    if (error) throw error;
    return { data, error };
  } catch (error) {
    return { error };
  }
}

export const resetUserPassword = async ({ password }) => {
  try {
    const { data, error } = await supabase.auth.updateUser({ password })
    if (error) throw error;
    console.log({ data, error })
    return { data, error };
  } catch (error) {
    return { error };
  }
}

export const updateUserPassword = async ({ currentPassword, password }) => {
  try {
    const { data, error } = await supabase.rpc('change_user_password', { current_plain_password: currentPassword, new_plain_password: password })
    if (error) throw error;
    console.log({ data, error })
    return { data, error };
  } catch (error) {
    return { error };
  }
} 
