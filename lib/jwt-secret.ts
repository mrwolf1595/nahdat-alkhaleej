export async function getJwtSecret() {
    return new TextEncoder().encode(process.env.JWT_SECRET!)
  }
  