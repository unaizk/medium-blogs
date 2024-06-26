import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { updateBlogInput, createBlogInput } from "@unaizk/medium-common";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userId : string
    }
}>();

// Middleware for authentication

blogRouter.use('/*', async(c, next) =>{
try {
    const token =  c.req.header('authorization') || '';
    
    console.log(token);
    
    const user = await verify(token,c.env.JWT_SECRET);
    
    if(user){
        c.set('userId',user.id)
        await next()
    }else{
        c.status(403);
        return c.json({error :"unauthorized"});
    }
} catch (error) {
    c.status(500);
    return c.json({ error: "Internal server error" });
}
})


//------------------------------------------------------------------------------------------------------------------------------------------------------


blogRouter.post('/', async(c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const {success} = createBlogInput.safeParse(body);
        if(!success){
          c.status(411);
          return c.json({message : "Inputs are not correct"})
        }
        const userId = c.get("userId")
        console.log(userId,'useriD');
        
        const blog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : userId
            }
        })
        c.status(201)
        return c.json({id :blog.id})
    } catch (error) {
        c.status(500);
        console.log(error);
        
        return c.json({error : "Internal server error"})
    }
    
  })
  
blogRouter.put('/', async(c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const {success} = updateBlogInput.safeParse(body);
        if(!success){
          c.status(411);
          return c.json({message : "Inputs are not correct"})
        }
        
        const blog = await prisma.post.update({
            where : {
               id : body.id
            },
            data : {
                title : body.title,
                content : body.content,
            }
        })
         c.status(201);
         return c.json({id : blog.id, blog : blog})
    } catch (error) {
        c.status(500);
        return c.json({error : "Internal server error"})
    }
})

blogRouter.get('/bulk', async(c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate());
        
        const blog = await prisma.post.findMany({
            select : {
                content : true,
                title : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
         c.status(200);
         return c.json(blog)
    } catch (error) {
        c.status(500);
        return c.json({error : "Internal server error"})
    }
});

blogRouter.get('/:id', async(c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const id = c.req.param("id");
        
        const blog = await prisma.post.findFirst({
            where : {
               id : id
            },
            select : {
                id : true,
                content : true,
                title : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
         c.status(200);
         return c.json(blog)
    } catch (error) {
        c.status(500);
        return c.json({error : "Internal server error"})
    }
});

