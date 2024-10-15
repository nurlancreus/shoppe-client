import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SessionType } from "../types";

export const getSession = (): SessionType | null => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Initialize user as null
  let session: SessionType | null = null

  if (accessToken) {
    try {
      // Verify the token and extract the payload
      const payload = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY!,
      ) as JwtPayload;


      session = {
        issuedAt: new Date((payload.iat ?? 0) * 1000), // Convert to Date object
        expiresAt: new Date((payload.exp ?? 0) * 1000), // Convert to Date object
        isAuth: true,
        user: {
          id: payload.sub, // User ID
          userName:
            payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          firstName:
            payload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
            ],
          lastName:
            payload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
            ],
          email:
            payload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          roles: ["admin"],
        }
      }
    } catch (error) {
      console.error("Invalid or expired token:", error);
      return null;
    }
  }

  return session;
};