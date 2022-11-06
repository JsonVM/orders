import { User } from "./user.interface";
import { VerificationCenter } from "../verifications/verification";
import { users } from "../database/users";

const verificationCenter = new VerificationCenter();
export const doLogin = async (user: User): Promise<any> => {
  let loggedUser: User;
  let ok = false;
  let message = "bad credentials";

  if (
    verificationCenter.verificationModes.get("authorization").verify(user) &&
    verificationCenter.verificationModes.get("sanitize").verify(user)
  ) {
    ok = true;
    loggedUser = getLoggedUser(user);
    message = "logged in";
  } else {
    if (!verificationCenter.verificationModes.get("bruteForce").verify(user)) {
      message = "account blocked";
    }
  }

  return { ok, message, user: loggedUser };
};

function getLoggedUser(user: User): User  {
    users.forEach( u => {
        if (u.userName == user.userName) user = u;
    })
    return user;
}
