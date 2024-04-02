import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { userRouter } from './routes/userRoutes';
import { blogRouter } from './routes/blogRoutes';

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    JWT_SECRET : string
  }
}>()

app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter)
// Middleware for authentication

app.use('/api/v1/blog/*', async(c, next) =>{
  try {
    const header =  c.req.header('authorization') || '';
    const token = header.split(" ")[1]
    const response = await verify(token,c.env.JWT_SECRET);
    if(response.id){
      next()
    }else{
      c.status(403);
      return c.json({error :"unauthorized"});
    }
  } catch (error) {
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
})


//------------------------------------------------------------------------------------------------------------------------------------------






export default app
