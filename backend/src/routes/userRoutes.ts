import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();

userRouter.post('/signup', async(c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());
  
      const { email, password, name } = await c.req.json();
  
      const user = await prisma.user.create({
        data: {
          email: email,
          password: password,
          name : name
        }
      });
  
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    } catch (error) {
      console.error("Error processing signup request:", error);
      c.status(500);
      return c.json({ error: "Internal server error" });
    }
  })
  
  userRouter.post('/signin', async (c) => {
    try {
      const prisma =new  PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
      }).$extends(withAccelerate())
      
      const body = await c.req.json();
  
      const user = await prisma.user.findFirst({
        where : {
          email : body.email,
          password : body.password
        }
      })
  
      if(!user){
        c.status(404);
        return c.json({error :"register before login"})
      };
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
  
  
    
    } catch (error) {
      console.error("Error processing signup request:", error);
      c.status(500);
      return c.json({ error: "Internal server error" });
    }
    
  })