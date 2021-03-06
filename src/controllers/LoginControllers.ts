import { NextFunction, Request, Response } from "express";
import { bodyValidator, controller, get, post } from "./decorators";
import { use } from "./decorators/use";
import { router } from "../routes/loginRoutes";

function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Request was made");
  next();
}

@controller("/auth")
class LoginControllers {
  @get("/login")
  @use(logger)
  getLogin(req: Request, res: Response) {
    res.send(`
  <form method="post">
  <div>
 <label>Email</label>
 <input name="email"/>
</div>
  <div>
 <label>Password</label>
 <input name="password" type="password"/>
</div>
<button>Submit</button>
</form>
  `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === "jon@gmail.com" && password === "test") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/");
  }
}
