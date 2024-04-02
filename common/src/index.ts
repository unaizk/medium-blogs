import z from 'zod';

export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().min(4),
    name : z.string().optional()
})






export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(4)
});






export const createBlogInput = z.object({
    title : z.string(),
    content : z.string()
});






export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id : z.string()
});

// Type inference in zod
export type SigninInput = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>