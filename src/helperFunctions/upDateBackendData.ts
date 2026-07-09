import type { ProfileData } from "../Types/customTypes";

export async function updateBackendData(
  destinationUrl: string,
  payload: Record<string, any>,
  httpMethod: string
): Promise<ProfileData> {
  try {
    const response = await fetch(destinationUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          `Server responded with status: ${response.status}`
      );
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error: any) {
    console.error(`API Update Failed at [${destinationUrl}]:`, error);
    throw error;
  }
}
