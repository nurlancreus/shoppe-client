import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
// utils/fetchWithAuth.ts
import https from 'https';

type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  issuedAt: Date;
  expiresAt: Date;
  isAuth: boolean;
  roles: ("admin" | "customer")[];
};

export const getUser = (): User | null => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Initialize user as null
  let user: User | null = null;

  if (accessToken) {
    try {
      // Verify the token and extract the payload
      const payload = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY!,
      ) as JwtPayload;

      user = {
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
        issuedAt: new Date((payload.iat ?? 0) * 1000), // Convert to Date object
        expiresAt: new Date((payload.exp ?? 0) * 1000), // Convert to Date object
        isAuth: true,
        roles: ["admin"],
      };
    } catch (error) {
      console.error("Invalid or expired token:", error);
      return null;
    }
  }

  return user;
};




export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let opt: any;
  
  // Check if in development environment
  if (process.env.NODE_ENV === 'development') {
    // Create an HTTPS agent that bypasses SSL certificate verification for self-signed certs
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    
   opt = {
      ...options,
      agent, // Attach custom HTTPS agent in development
    };
  }

  // Perform the fetch call
  const response = await fetch(url, opt);
  return response;
};
