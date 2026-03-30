import { supabase } from '@/utils/supabase';

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
};

export const signUp = async (email: string, password: string, username: string) => {
  const { data: check, error: checkError } = await supabase.rpc('check_registration_available', {
    p_email: email,
    p_username: username,
  });
  if (checkError) throw new Error(checkError.message);
  if (check.emailTaken) throw new Error('EMAIL_ALREADY_EXISTS');
  if (check.usernameTaken) throw new Error('USERNAME_ALREADY_EXISTS');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });
  if (error) throw new Error(error.message);
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
};
