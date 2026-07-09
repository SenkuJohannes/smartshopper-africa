import { supabaseAdmin } from "@/lib/supabase/admin";

type CreateAuthUserInput = {
  email: string;
  password: string;
  ownerName: string;
};

export async function createAuthUser({
  email,
  password,
  ownerName,
}: CreateAuthUserInput) {
  const { data, error } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        owner_name: ownerName,
      },
    });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}