'use server'

import { createClient } from '@/util/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function login(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const userData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error, data } = await supabase.auth.signInWithPassword(userData)
    if (error) {
        // Convert the error into a plain object
        return { error: { message: error?.message } };
    }
    // Ensure data is also a plain object or null if not applicable
    return { data: data ? { ...data } : null };
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const userData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error, data } = await supabase.auth.signUp(userData)

    if (error) {
        // Convert the error into a plain object
        return { error: { message: error?.message } };
    }

    // Ensure data is also a plain object or null if not applicable
    return { data: data ? { ...data } : null };
}

export async function signOut() {
    const supabase = createClient()
    return await supabase.auth.signOut()
}